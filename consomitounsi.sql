-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  jeu. 05 déc. 2019 à 09:28
-- Version du serveur :  5.7.26
-- Version de PHP :  7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `consomitounsi`
--

-- --------------------------------------------------------

--
-- Structure de la table `membres`
--

DROP TABLE IF EXISTS `membres`;
CREATE TABLE IF NOT EXISTS `membres` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `membres`
--

INSERT INTO `membres` (`id`, `name`) VALUES
(1, 'ali'),
(2, 'john'),
(6, 'bhar'),
(5, 'fadwa');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `unique_id` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `encrypted_password` varchar(128) NOT NULL,
  `salt` varchar(16) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_id` (`unique_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `unique_id`, `name`, `email`, `encrypted_password`, `salt`, `created_at`, `updated_at`, `image`) VALUES
(1, '53d5fc0f-9069-4e8a-8eb2-a9edd3c0c1cd', 'arif', 'a@a.com', '1234', 'e745a4a3883344ea', '2019-12-03 21:34:28', '2019-12-03 21:34:28', NULL),
(2, 'afe6e625-0824-49be-9449-b1095b05f11d', 'fadwa', 'fadwa@esprit.tn', 'c88e14552157eb6252c46e2c5046b98fea7e985ee237894aebb5829d099503c0f241d5aa64ea0d55eea75163c5d3564d8b6f4b5a594a0ebacc6b311622507e1b', '54d60561e5eb70af', '2019-12-03 21:35:40', '2019-12-03 21:35:40', 'userImage-1575536271466'),
(3, '7b62de6e-a06b-4445-9d8e-975524c93671', 'kaabech', 'kaabech@esprit.tn', 'cc823e01839b5bc3517b1d3ed71aefbee6e6812994be3a9063574083f828dd06fb81990e72ee0eed7a1863a6088d43fdde7383bbacdfe1bff0b300e58d4e2c54', 'c42c41d09852045c', '2019-12-05 01:34:46', '2019-12-05 01:34:46', NULL),
(4, '615e365a-ee61-43fb-991b-d41b211bf231', 'aymen', 'aymen@esprit.tn', '6016b23fc896d85d484e864cad42d6721c4067f76fe7ae44c294349443fc9626f1deae3f67e3990ade89321276559beae4e2d9ecc4cfb827c23cc0420f80efc1', '6f709daeadb05c6b', '2019-12-05 02:26:51', '2019-12-05 02:26:51', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
