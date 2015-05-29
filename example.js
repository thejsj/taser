var taser = require('./taser');

// Validation
checkType(opts.db, ['string', 'undefined', 'null']);
checkType(opts.source, 'string', 'opts.source');
checkType(opts.target, 'string', 'opts.target');
checkType(opts.rethinkdb, 'object', 'opts.rethinkdb');
checkType(opts.rethinkdb.host, 'string', 'opts.rethinkdb.host');
checkType(opts.rethinkdb.port, 'number', 'opts.rethinkdb.port');
checkType(opts.rethinkdb.db, ['string', 'undefined', 'null']);
checkType(opts.mongodb, 'object', 'opts.mongodb');
checkType(opts.mongodb.host, 'string', 'opts.mongodb.host');
checkType(opts.mongodb.port, 'number', 'opts.mongodb.port');
checkType(opts.mongodb.db, ['string', 'undefined', 'null']);
checkType(opts.collection, ['undefined', 'boolean', 'array', 'null']);
checkType(opts.convertId, 'boolean');
checkType(opts.append, 'boolean');
checkType(opts.rowsPerBatch, 'number');
checkType(opts.log, 'boolean');
