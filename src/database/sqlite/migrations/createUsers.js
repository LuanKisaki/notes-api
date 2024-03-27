const createUsers = `
CREATE TABLE If NOT EXISTS users (
	id					INTEGER				PRIMARY KEY	AUTOINCREMENT,
	name				VARCHAR(255),
  email				VARCHAR(50),
  password 		VARCHAR(50),
  avatar			VARCHAR NULL,
  created_at 	TIMESTAMP 		DEFAULT CURRENT_TIMESTAMP,
  updated_at	TIMESTAMP 		DEFAULT CURRENT_TIMESTAMP
)
`;

module.exports = createUsers;