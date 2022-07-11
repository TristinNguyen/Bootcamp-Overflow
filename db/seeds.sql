USE bootcamp_post_db;

INSERT INTO user (id, username, email, password) 
VALUES
  (1, 'Ronald', 'ronnym@gmail.com', 'password123'),
  (2, 'Joey Doaks', 'jd@aim.com', 'smokingfool'),
  (3, 'FunnyGuy', 'verry-funny@jokes.com', 'hahahaha'),
  (4, 'Humpty Dumpty', 'HD@aol.com', 'Oh-Whatta-Fall'),
  (5, 'Eric Cartman', 'fuck@you.com', 'YourParentsAreInTheChilli'),
  (6, 'Bart Simpson', 'You@suck.com', 'IHeartCartman');


INSERT INTO question (title, question, user_id) 
VALUES  
  ('Why Me?', 'What is the meaning of life?', 1),
  ('Chilli', 'What is the best way to cook someones parents?', 5),
  ('what time is it?', 'Now is the time for all good men to come to the aid of their country', 2);