-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: logondb
-- ------------------------------------------------------
-- Server version	5.7.40-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `t_diary`
--

DROP TABLE IF EXISTS `t_diary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_diary` (
  `diary_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '일기번호',
  `diary_content` text NOT NULL COMMENT '일기내용',
  `diary_img` varchar(300) DEFAULT NULL COMMENT '일기사진',
  `create_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '작성날짜',
  `delete_yn` char(1) NOT NULL DEFAULT 'N' COMMENT '삭제여부',
  `mood_id` int(5) NOT NULL,
  PRIMARY KEY (`diary_id`),
  KEY `mood_id` (`mood_id`),
  CONSTRAINT `t_diary_ibfk_1` FOREIGN KEY (`mood_id`) REFERENCES `t_mood` (`mood_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_diary`
--

LOCK TABLES `t_diary` WRITE;
/*!40000 ALTER TABLE `t_diary` DISABLE KEYS */;
INSERT INTO `t_diary` VALUES (1,'짜증나수정 할게요ㄴㄴㅊㄴㅇㄹㄴㅇㄹㅇㅇㄹㅇㅁㄴㅁㄴㅁㅁㅇㅎㅇㅎㄹㄹㄴㅇㄴㅁㅇㅁㄴㅇ','1684142629476sample_5.PNG','2023-05-15 18:23:49','Y',2),(2,'ㄴㅇㄹㄴ','1684209148231sample_3.PNG','2023-05-16 12:52:28','Y',2),(3,'진짜 짜증나','1684209332011sample_5.PNG','2023-05-16 12:55:32','Y',3),(4,'ㄹㅇㄴㄹㅇㄹㅇㄴ','1684209502508sample_5.PNG','2023-05-16 12:58:22','Y',1),(5,'dfsdfsdgsgsgdasfasf','1684210263091sample_5.PNG','2023-05-16 13:11:03','Y',3),(6,'sfsfsfsf','1684210483571sample_5.PNG','2023-05-16 13:14:43','Y',5),(7,'dfsfsf','1684210894082sample_5.PNG','2023-05-16 13:21:34','Y',3),(8,'오늘은 Log 해 주세요. :D','1684215031379sample_5.PNG','2023-05-16 14:30:31','Y',5),(9,'sgdgd','1684215135780sample_5.PNG','2023-05-16 14:32:15','Y',1),(10,'dgdfgdf','1684215268044sample_5.PNG','2023-05-16 14:34:28','Y',4),(11,'ㄴㄹㄴㄹㄴㄹ','1684215725138sample_5.PNG','2023-05-16 14:42:05','Y',5),(12,'오늘은 나의 생일이다!!!! \n아침부터 가족들과 생일 상을 함께 먹으며 축하를 받고 \n생일이지만 에이에스는 받아야지... \n애플에 가서 에이에스를 받다가 반나절이 가버렸다 \n결국 고치지도 못 했지만 \n','1684717172090sample_4.PNG','2023-05-20 09:59:32','N',1),(13,'요즘 프로젝트를 해도 해도 끝나지가 않는다 정말 너무 힘들다 ','1684717256962sample_5.PNG','2023-05-16 10:00:56','N',5),(14,'오늘은 친구를 만났는데\n친구가 깜짝 서프라이즈 생일 파티를 해줬다 ','1684717320460sample_3.PNG','2023-05-21 10:02:00','N',1),(15,'오늘은 힘들었지만 \n기분은 좋은 하루였다 ','1684717380076sample_1.PNG','2023-05-18 10:03:00','N',2),(16,'쏘쏘 무엇인지 모르겠는 일기','1684717450113sample_2.PNG','2023-05-10 10:04:10','N',3),(17,'하아아ㅏ아아아ㅏㅏ\n데이터 넣는게 더 힘든 것 같은데','1684717533785sample_4.PNG','2023-05-05 10:05:33','N',4),(18,'15일도 너무 힘든 걸로 하자','1684717706322sample_5.PNG','2023-05-15 10:08:26','N',4);
/*!40000 ALTER TABLE `t_diary` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-22 10:14:00
