const mongoose = require('mongoose');

/**
 * Execute work function inside a MongoDB transaction if supported by server (replica set / mongos).
 * Fallbacks gracefully to standard execution if MongoDB is running as a single-node standalone instance.
 * @param {Function} workFn - Async callback receiving `session` (or null if unsupported)
 * @returns {Promise<any>} Result of workFn
 */
async function runWithTransaction(workFn) {
  let session = null;
  let useTransaction = false;

  try {
    session = await mongoose.startSession();
    session.startTransaction();
    useTransaction = true;
  } catch (err) {
    // MongoDB standalone instance does not support transactions
    useTransaction = false;
    if (session) {
      session.endSession();
      session = null;
    }
  }

  if (useTransaction && session) {
    try {
      const result = await workFn(session);
      await session.commitTransaction();
      session.endSession();
      return result;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } else {
    // Standalone mode execution without transactions
    return await workFn(null);
  }
}

module.exports = {
  runWithTransaction,
};
