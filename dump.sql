-- MySQL dump 10.13  Distrib 9.1.0, for Win64 (x86_64)
--
-- Host: localhost    Database: video_library
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `preview_link` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Visual Effects','https://i.ibb.co/LtLjvZr/Comp-1-00000.jpg'),(2,'Sound Effects','https://i.ibb.co/LtLjvZr/Comp-1-00000.jpg'),(3,'Transition Effects','https://i.ibb.co/LtLjvZr/Comp-1-00000.jpg'),(4,'Color Grading','https://i.ibb.co/LtLjvZr/Comp-1-00000.jpg');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `videos`
--

DROP TABLE IF EXISTS `videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `videos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `preview_link` varchar(255) NOT NULL,
  `video_id` varchar(255) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videos`
--

LOCK TABLES `videos` WRITE;
/*!40000 ALTER TABLE `videos` DISABLE KEYS */;
INSERT INTO `videos` VALUES (33,'Video 1 - Visual Effects','Description for Video 1','https://i.ibb.co/LtLjvZr/Comp-1-00000.jpg','6cYUdRtSPEA',1),(34,'Video 2 - Visual Effects','Description for Video 2','https://i.ibb.co/LtLjvZr/Comp-1-00000.jpg','6cYUdRtSPEA',1),(35,'Video 3 - Visual Effects','Description for Video 3','https://i.ibb.co/LtLjvZr/Comp-1-00000.jpg','6cYUdRtSPEA',1),(36,'Video 4 - Visual Effects','Description for Video 4','https://i.ibb.co/LtLjvZr/Comp-1-00000.jpg','6cYUdRtSPEA',1),(37,'Video 5 - Visual Effects','Description for Video 5','https://i.ibb.co/LtLjvZr/Comp-1-00000.jpg','6cYUdRtSPEA',1),(38,'Video 6 - Visual Effects','Description for Video 6','https://i.ibb.co/LtLjvZr/Comp-1-00000.jpg','6cYUdRtSPEA',1),(39,'Video 1 - Sound Effects','Description for Video 1','https://i.ibb.co/LtLjvZr/Comp-1-00000.jpg','6cYUdRtSPEA',2),(40,'Video 2 - Sound Effects','Description for Video 2','https://i.ibb.co/LtLjvZr/Comp-1-00000.jpg','6cYUdRtSPEA',2),(41,'Video 3 - Sound Effects','Description for Video 3','https://i.ibb.co/LtLjvZr/Comp-1-00000.jpg','6cYUdRtSPEA',2),(42,'Video 4 - Sound Effects','Description for Video 4','https://i.ibb.co/LtLjvZr/Comp-1-00000.jpg','6cYUdRtSPEA',2),(43,'Video 5 - Sound Effects','Description for Video 5','https://i.ibb.co/LtLjvZr/Comp-1-00000.jpg','6cYUdRtSPEA',2),(44,'Video 6 - Sound Effects','Description for Video 6','https://i.ibb.co/LtLjvZr/Comp-1-00000.jpg','6cYUdRtSPEA',2),(45,'Video 1 - Transition Effects','Description for Video 1','https://i.ibb.co/LtLjvZr/Comp-1-00000.jpg','6cYUdRtSPEA',3),(46,'Video 2 - Transition Effects','Description for Video 2','https://i.ibb.co/LtLjvZr/Comp-1-00000.jpg','6cYUdRtSPEA',3),(47,'Video 3 - Transition Effects','Description for Video 3','https://i.ibb.co/LtLjvZr/Comp-1-00000.jpg','6cYUdRtSPEA',3),(48,'Video 4 - Transition Effects','Description for Video 4','https://i.ibb.co/LtLjvZr/Comp-1-00000.jpg','6cYUdRtSPEA',3),(49,'Video 5 - Transition Effects','Description for Video 5','https://i.ibb.co/LtLjvZr/Comp-1-00000.jpg','6cYUdRtSPEA',3),(50,'Video 6 - Transition Effects','Description for Video 6','https://i.ibb.co/LtLjvZr/Comp-1-00000.jpg','6cYUdRtSPEA',3),(51,'Video 1 - Color Grading','Description for Video 1','https://i.ibb.co/LtLjvZr/Comp-1-00000.jpg','6cYUdRtSPEA',4),(52,'Video 2 - Color Grading','Description for Video 2','https://i.ibb.co/LtLjvZr/Comp-1-00000.jpg','6cYUdRtSPEA',4),(53,'Video 3 - Color Grading','Description for Video 3','https://i.ibb.co/LtLjvZr/Comp-1-00000.jpg','6cYUdRtSPEA',4),(54,'Video 4 - Color Grading','Description for Video 4','https://i.ibb.co/LtLjvZr/Comp-1-00000.jpg','6cYUdRtSPEA',4),(55,'Video 5 - Color Grading','Description for Video 5','https://i.ibb.co/LtLjvZr/Comp-1-00000.jpg','6cYUdRtSPEA',4),(56,'Video 6 - Color Grading','Description for Video 6','https://i.ibb.co/LtLjvZr/Comp-1-00000.jpg','6cYUdRtSPEA',4);
/*!40000 ALTER TABLE `videos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-22 18:16:31
