/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.6.21-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: my_db
-- ------------------------------------------------------
-- Server version	10.6.21-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `options`
--

DROP TABLE IF EXISTS `options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `options` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `value` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_4d886cd47aa57e872fbf2ab3c1` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `options`
--

LOCK TABLES `options` WRITE;
/*!40000 ALTER TABLE `options` DISABLE KEYS */;
INSERT INTO `options` VALUES (1,'boot_counter','number','1'),(2,'boot_counter_date','string','2025-05-20'),(3,'boot_last_time','string','2025-05-20T06:08:39.815Z'),(4,'site_title','string','Mi Sitio Web'),(5,'maintenance_mode','boolean','false'),(6,'support_email','string','soporte@example.com');
/*!40000 ALTER TABLE `options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shortener`
--

DROP TABLE IF EXISTS `shortener`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `shortener` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shortCode` varchar(255) NOT NULL,
  `originalUrl` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_4ca84f0556df6f9e4ab804205c` (`shortCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shortener`
--

LOCK TABLES `shortener` WRITE;
/*!40000 ALTER TABLE `shortener` DISABLE KEYS */;
/*!40000 ALTER TABLE `shortener` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shortener_visit`
--

DROP TABLE IF EXISTS `shortener_visit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `shortener_visit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(255) DEFAULT NULL,
  `userAgent` varchar(255) DEFAULT NULL,
  `referrer` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `device` varchar(255) DEFAULT NULL,
  `visitedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `shortenerId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3862d2f1bb1d3dc920700c98450` (`shortenerId`),
  CONSTRAINT `FK_3862d2f1bb1d3dc920700c98450` FOREIGN KEY (`shortenerId`) REFERENCES `shortener` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shortener_visit`
--

LOCK TABLES `shortener_visit` WRITE;
/*!40000 ALTER TABLE `shortener_visit` DISABLE KEYS */;
/*!40000 ALTER TABLE `shortener_visit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stat`
--

DROP TABLE IF EXISTS `stat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `stat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `currentURL` varchar(255) DEFAULT NULL,
  `referrerURL` varchar(255) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `countryName` varchar(255) DEFAULT NULL,
  `timezone` varchar(255) DEFAULT NULL,
  `utcOffset` varchar(255) DEFAULT NULL,
  `countryCallingCode` varchar(255) DEFAULT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `currencyName` varchar(255) DEFAULT NULL,
  `languages` varchar(255) DEFAULT NULL,
  `countryPopulation` bigint(20) DEFAULT NULL,
  `org` varchar(255) DEFAULT NULL,
  `rawTime` varchar(255) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stat`
--

LOCK TABLES `stat` WRITE;
/*!40000 ALTER TABLE `stat` DISABLE KEYS */;
/*!40000 ALTER TABLE `stat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `whatsapp` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `role` enum('user','admin','superadmin','collaborator','developer','guest') NOT NULL DEFAULT 'user',
  `isVisible` tinyint(4) NOT NULL DEFAULT 1,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('54695949-687c-45f5-b7df-4a08d810f0ee','SUPERADMIN',NULL,'fgp555@gmail.com',NULL,'$2b$10$8R0enA01EmAeLtUON7v95OkXH4j9i4qQ9JvZxcvPI527EsbVpfXxm','https://i.postimg.cc/T3PVPkLH/icon-user.webp','superadmin',1,'2025-05-20 01:08:39.978824'),('924d995a-e211-447b-a67d-9ab52861213f','Bob',NULL,'bob@example.com',NULL,'$2b$10$EB5ub3ERNBhAGLjnXAnBUezRcWkLb.bJpxqHP/J1O1nahrfeLyWc2',NULL,'user',1,'2025-05-20 01:08:39.986257');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visits`
--

DROP TABLE IF EXISTS `visits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `visits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `visitedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `path` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visits`
--

LOCK TABLES `visits` WRITE;
/*!40000 ALTER TABLE `visits` DISABLE KEYS */;
/*!40000 ALTER TABLE `visits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `whatsapp_messages`
--

DROP TABLE IF EXISTS `whatsapp_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `whatsapp_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `WHATSAPP_ID` varchar(255) DEFAULT NULL,
  `entry_id` varchar(255) DEFAULT NULL,
  `contacts_wa_id` varchar(255) DEFAULT NULL,
  `contacts_name` varchar(255) DEFAULT NULL,
  `messages_from` varchar(255) DEFAULT NULL,
  `messages_id` varchar(255) DEFAULT NULL,
  `messages_timestamp` varchar(255) DEFAULT NULL,
  `messages_type` varchar(255) DEFAULT NULL,
  `messages_body` text DEFAULT NULL,
  `reaction_emoji` varchar(255) DEFAULT NULL,
  `statuses_id` varchar(255) DEFAULT NULL,
  `statuses_timestamp` varchar(255) DEFAULT NULL,
  `statuses_recipient_id` varchar(255) DEFAULT NULL,
  `expiration_timestamp` varchar(255) DEFAULT NULL,
  `pricing_billable` varchar(255) DEFAULT NULL,
  `pricing_category` varchar(255) DEFAULT NULL,
  `statuses_status` varchar(255) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `whatsapp_messages`
--

LOCK TABLES `whatsapp_messages` WRITE;
/*!40000 ALTER TABLE `whatsapp_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `whatsapp_messages` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-20  1:10:20
