# migrations/

Database schema migrations — source of truth for the operational DB and the
separate immutable audit store. Every migration: forward + rollback path,
reviewed before apply. Schema changes on production are CONSEQUENTIAL-class
changes (approval + validation required). Audit store schema is lane-3.
