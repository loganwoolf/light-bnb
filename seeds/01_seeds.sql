INSERT INTO users (name, email, password)
VALUES 
  ('Bill Brown', 'bill.brown@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
  ('Greg Green', 'greg_green@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
  ('Wendy White', 'wendywhite@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u')
;

INSERT INTO properties (
  owner_id,
  title,
  description,
  thumbnail_photo_url,
  cover_photo_url,
  cost_per_night,
  parking_spaces,
  number_of_bathrooms,
  number_of_bedrooms,
  country,
  street,
  city,
  province,
  post_code
)
VALUES
  (
    1,
    'Mountain Retreat',
    'Magnificent description text',
    'greatpic.png',
    'smallpic.png',
    120,
    5,
    2,
    3,
    'Canada',
    'High Road Drive',
    'Nelson',
    'British Columbia',
    'G4G4G4'
  ),
  (
    1,
    'Prairie Living',
    'Superior description text',
    'greatpic.png',
    'smallpic.png',
    79,
    3,
    1,
    2,
    'Canada',
    'Dusty Trail',
    'Grande Prairie',
    'Alberta',
    'T5T5T5'
  ),
  (
    2,
    'Lake Cabin',
    'Powerful description text',
    'greatpic.png',
    'smallpic.png',
    260,
    8,
    3,
    5,
    'United States of America',
    'Lake Road',
    'Whitefish',
    'Montana',
    '54325'
  )
;

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES
  ('2018-09-11', '2018-09-26', 1, 2),
  ('2019-01-04', '2019-02-01', 1, 3),
  ('2018-09-11', '2018-09-26', 2, 1)
;

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES
  (2,1,1,4,'wow'),
  (3,1,2,5,'nice'),
  (1,2,3,5,'beauty')
;