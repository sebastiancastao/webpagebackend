SHOW DATABASES;

USE frankgp_db;

/*!40000 ALTER TABLE `users` DISABLE KEYS */
;
INSERT INTO
    `users`
VALUES (
        '54695949-687c-45f5-b7df-4a08d810f0e4',
        'SUPERADMIN',
        NULL,
        'fgp555@gmail.com',
        NULL,
        '$2b$10$H.db65rp3JZ0XewKdePOGuTFcE2.T5tNMQJ5D1WT4PBm4TSy3dk0q',
        'https://i.postimg.cc/T3PVPkLH/icon-user.webp',
        'superadmin',
        1,
        '2025-05-09 21:59:56.066315'
    );
/*!40000 ALTER TABLE `users` ENABLE KEYS */
;

DESCRIBE users;

SELECT * FROM users;