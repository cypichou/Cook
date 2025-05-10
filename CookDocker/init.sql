-- MySQL dump 10.13  Distrib 9.2.0, for Linux (x86_64)
--
-- Host: localhost    Database: cook
-- ------------------------------------------------------
-- Server version	9.2.0

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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Drop all tables
drop table if exists ingredients;
DROP TABLE IF EXISTS saisons;
drop table if exists timing;
drop table if exists categories;
DROP TABLE IF EXISTS utilisateurs_recettes;
drop table if exists semaines_pref;
drop table if exists recettes_semaine;
drop table if exists recettes;
DROP TABLE IF EXISTS utilisateurs;
drop table if exists recette_outils;
drop table if exists outils;

-- Create all tables manque plus que 4
CREATE TABLE utilisateurs (
                             id INT not null AUTO_INCREMENT,
                             nom VARCHAR(255) DEFAULT NULL ,
                             prenom VARCHAR(255) DEFAULT NULL,
                             sexe VARCHAR(255) DEFAULT NULL,
                             mail VARCHAR(255) DEFAULT NULL,
                             mdp VARCHAR(255) DEFAULT NULL,
                             activite VARCHAR(255) DEFAULT NULL,
                             objectifs VARCHAR(255) DEFAULT NULL,
                             calories VARCHAR(255) DEFAULT NULL,
                             proteines VARCHAR(255) DEFAULT NULL,
                             lipides VARCHAR(255) DEFAULT NULL,
                             glucides VARCHAR(255) DEFAULT NULL,
                             primary key (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE saisons (
    id int not null auto_increment,
    nom varchar(255) default null,
    primary key (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

create table timing (
    id int not null auto_increment,
    nom varchar(255) default null,
    primary key (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

create table categories (
                        id int not null auto_increment,
                        nom varchar(255) default null,
                        unite varchar(10) default null,
                        primary key (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

create table ingredients (
    id int not null auto_increment,
    nom varchar(255) default null,
    proteines int default null,
    glucides int default null,
    lipides int default null,
    calories int default null,
    id_saison int default null,
    id_categorie int default null,
    primary key (id),
    key id_saison (id_saison),
    key id_categorie (id_categorie),
    constraint ingredients_ibfk_1 foreign key (id_saison) references saisons(id),
    constraint ingredients_ibfk_2 foreign key (id_categorie) references categories(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

create table recettes(
    id int not null auto_increment,
    nom varchar(255) not null,
    temps_de_preparation int default null,
    consignes text,
    primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE utilisateurs_recettes (
                                       utilisateur_id INT NOT NULL,
                                       recette_id INT NOT NULL,
                                       PRIMARY KEY (utilisateur_id,recette_id),
                                       KEY recette_id (recette_id),
                                       CONSTRAINT utilisateurs_recettes_ibfk_1 foreign key (utilisateur_id) references utilisateurs (id),
                                       CONSTRAINT utilisateurs_recettes_ibfk_2 foreign key (recette_id) references recettes (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

create table recettes_semaine (
    id_semaine int not null auto_increment,
    jour varchar(20) default null,
    moment varchar(20) default null,
    id_recette int,
    primary key (id_semaine),
    key id_recette (id_recette),
    constraint recettes_semaine_ibfk_1 foreign key (id_recette) references recettes (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

create table semaines_pref (
    nom varchar(255) not null,
    id_user int,
    id_semaine int,
    primary key (nom),
    key nom (nom),
    constraint semaines_pref_ibfk_1 foreign key (id_user) references utilisateurs(id),
    constraint semaines_pref_ibfk_2 foreign key (id_semaine) references recettes_semaine(id_semaine)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

create table outils (
    id_outil int not null auto_increment,
    nom varchar(20),
    primary key (id_outil)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

create table recette_outils (
    id_outil int,
    id_recette int,
    primary key (id_outil,id_recette),
    constraint recette_outils_ibfk_1 foreign key (id_outil) references outils(id_outil),
    constraint recette_outils_ibfk_2 foreign key (id_recette) references recettes(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE recettes_ingredients (
                                      id_recette INT NOT NULL,
                                      id_ingredient int not null,
                                      PRIMARY KEY (id_recette,id_ingredient),
                                      KEY recette_id (id_recette),
                                      CONSTRAINT recettes_ingredients_ibfk_1 foreign key (id_ingredient) references ingredients (id),
                                      CONSTRAINT recettes_ingredients_ibfk_2 foreign key (id_recette) references recettes (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;