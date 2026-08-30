const crypto = require('crypto');

/**
 * Generate a unique, human-readable company code
 * Example: ACME-4821 or HD-7K4P9
 * @param {string} companyName - Name of the company
 * @returns {string} Unique company code
 */
function generateCompanyCode(companyName = 'HD') {
  // Extract alphanumeric characters from company name for prefix
  const cleanName = companyName
    .replace(/[^a-zA-Z0-9]/g, '')
    .toUpperCase();

  const prefix = cleanName.length >= 3 ? cleanName.substring(0, 4) : 'HD';

  // Generate 5 random alphanumeric uppercase characters
  const randomChars = crypto
    .randomBytes(4)
    .toString('hex')
    .toUpperCase()
    .substring(0, 5);

  return `${prefix}-${randomChars}`;
}

module.exports = generateCompanyCode;
