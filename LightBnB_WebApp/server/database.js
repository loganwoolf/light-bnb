const db = require('../db')

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const queryString = 'SELECT * FROM users WHERE email = $1';
  const values = [email];

  return db
    .query(queryString, values)
    .then(result => {
      return result.rows[0];
    })
    .catch(err => {
      console.error(err.message);
      return null;
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryString = 'SELECT * FROM users WHERE id = $1';
  const values = [id];

  return db
    .query(queryString, values)
    .then(result => {
      return result.rows[0];
    })
    .catch(err => {
      console.error(err.message);
      return null;
    });
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const queryString = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *`;
  const values = [user.name, user.email, 'password'];

  return db
    .query(queryString, values)
    .then(result => {
      return result.rows[0];
    })
    .catch(err => console.error(err.message));
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guestID The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guestID, limit = 10) {
  const queryString = `
    SELECT * FROM reservations
    JOIN properties ON properties.id = property_id
    WHERE guest_id = $1 LIMIT $2`;
  const values = [guestID, limit];

  return db
    .query(queryString, values)
    .then(result => {
      return result.rows;
    })
    .catch(err => {
      console.error(err.message);
      return null;
    });
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  // determines whether a WHERE or an AND needs to be put in
  let whereCount = 0;
  const where = () => {
    return whereCount++ > 0 ? "AND" : "WHERE";
  };

  // holds the query parameters for .query() to apply to its $1..$n placeholders
  // populated with .push() when needed to set correct placeholder index
  const queryParams = [];

  let queryString = ` 
    SELECT properties.*, AVG(property_reviews.rating) AS average_rating 
    FROM properties 
    JOIN property_reviews ON properties.id = property_id `;
  if (options.owner_id) {
    queryParams.push(options.owner_id);
    queryString += `${where()} owner_id = $${queryParams.length}`;
  }
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `${where()} city LIKE $${queryParams.length} `;
  }
  if (options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night);
    queryString += `${where()} cost_per_night >= $${queryParams.length} `;
  }
  if (options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night);
    queryString += `${where()} cost_per_night <= $${queryParams.length} `;
  }
  //string must come before any HAVING clauses
  queryString += ` 
    GROUP BY properties.id `;
  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += `HAVING AVG(property_reviews.rating) >= $${queryParams.length} `;
  }
  queryParams.push(limit);
  queryString += ` 
  ORDER BY cost_per_night 
  LIMIT $${queryParams.length} `;

  return db
    .query(queryString, queryParams)
    .then(result => {
      return result.rows;
    })
    .catch(err => console.error(err.message));
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  let counter = 1;
  const n = () => {
    return counter++;
  };

  const queryValues = [
    property.title, property.description, property.number_of_bedrooms, property.number_of_bathrooms,
    property.parking_spaces, property.cost_per_night, property.thumbnail_photo_url,
    property.cover_photo_url, property.street, property.country, property.city, property.province,
    property.post_code, property.owner_id
  ];
  const queryString = `
    INSERT INTO properties (
      title, description, number_of_bedrooms, number_of_bathrooms,
      parking_spaces, cost_per_night, thumbnail_photo_url, cover_photo_url,
      street, country, city, province, post_code, owner_id)
    VALUES (
      $${n()}, $${n()}, $${n()}, $${n()}, $${n()}, $${n()}, $${n()},
      $${n()}, $${n()}, $${n()}, $${n()}, $${n()}, $${n()}, $${n()})
      RETURNING * `;

  return db
    .query(queryString, queryValues)
    .then(result => result.rows)
    .catch(err => console.error(err.message));

};
exports.addProperty = addProperty;
