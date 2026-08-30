const { AbilityBuilder, createMongoAbility } = require('@casl/ability');

/**
 * Define CASL abilities based on User role and profile
 * @param {Object} user - Authenticated user object from req.user
 * @returns {MongoAbility} CASL Ability instance
 */
function defineAbilityFor(user) {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

  if (!user) {
    // Unauthenticated guest abilities
    can('read', 'Article');
    return build();
  }

  if (user.role === 'admin') {
    // Admin has full CRUD access to all subjects
    can('manage', 'all');
  } else if (user.role === 'agent') {
    // Support Agent abilities
    can('read', 'User');
    can('read', 'Ticket');
    can('update', 'Ticket');
    can('create', 'Comment');
    can('read', 'Comment');
    can('read', 'Article');
  } else if (user.role === 'customer') {
    // Customer/User abilities
    can('read', 'User', { _id: user._id });
    can('update', 'User', { _id: user._id });
    can('create', 'Ticket');
    can('read', 'Ticket', { customerId: user._id });
    can('update', 'Ticket', { customerId: user._id });
    can('create', 'Comment', { authorId: user._id });
    can('read', 'Comment');
    can('read', 'Article');
  }

  return build();
}

module.exports = {
  defineAbilityFor,
};
