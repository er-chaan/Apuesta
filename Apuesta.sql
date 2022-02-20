-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 20, 2022 at 11:29 PM
-- Server version: 8.0.27-0ubuntu0.20.04.1
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Apuesta`
--

-- --------------------------------------------------------

--
-- Table structure for table `bets`
--

CREATE TABLE `bets` (
  `id` int NOT NULL,
  `uid` int NOT NULL,
  `bid` int NOT NULL,
  `type` enum('toss','result') NOT NULL,
  `team` varchar(100) NOT NULL,
  `rate` float NOT NULL,
  `amount` int NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` enum('booked','won','lost','no result') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'booked'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `bets`
--

INSERT INTO `bets` (`id`, `uid`, `bid`, `type`, `team`, `rate`, `amount`, `status`) VALUES
(21, 82, 44, 'toss', 'Oman', 1.2, 10, 'no result'),
(22, 82, 44, 'result', 'Oman', 1.4, 10, 'no result');

-- --------------------------------------------------------

--
-- Table structure for table `board`
--

CREATE TABLE `board` (
  `id` int NOT NULL,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `apiId` int NOT NULL,
  `format` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `teamA` varchar(100) NOT NULL,
  `teamB` varchar(100) NOT NULL,
  `scoreA` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0-0 (0)',
  `scoreB` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0-0 (0)',
  `isLive` tinyint(1) NOT NULL DEFAULT '0',
  `tossDecision` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  `toss` varchar(100) NOT NULL DEFAULT '0',
  `resultText` varchar(500) DEFAULT NULL,
  `winner` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '0',
  `startsAt` timestamp NOT NULL,
  `endsAt` timestamp NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `rateTossTeamA` float NOT NULL DEFAULT '0',
  `rateTossTeamB` float NOT NULL DEFAULT '0',
  `rateWinnerTeamA` float NOT NULL DEFAULT '0',
  `rateWinnerTeamB` float NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `board`
--

INSERT INTO `board` (`id`, `status`, `apiId`, `format`, `teamA`, `teamB`, `scoreA`, `scoreB`, `isLive`, `tossDecision`, `toss`, `resultText`, `winner`, `startsAt`, `endsAt`, `rateTossTeamA`, `rateTossTeamB`, `rateWinnerTeamA`, `rateWinnerTeamB`) VALUES
(36, 'completed', 11760, 'T20', 'India', 'West Indies', '162-4(18.5)', '157-7(20.0)', 0, 'Field', 'India', 'India win by 6 wickets', 'India', '2022-02-16 13:30:00', '2022-02-16 16:30:00', 0, 0, 0, 0),
(37, 'completed', 11907, 'Test', 'New Zealand', 'South Africa', '482-10(117.5)', '95-10(49.2) & 111-10(41.4)', 0, 'Field', 'New Zealand', 'New Zealand win by an innings and 276 runs', 'New Zealand', '2022-02-16 22:00:00', '2022-02-21 05:00:00', 0, 0, 0, 0),
(38, 'completed', 11099, 'T20', 'Australia', 'Sri Lanka', '143-4(18.1)', '139-8(20.0)', 0, 'Field', 'Australia', 'Australia win by 6 wickets', 'Australia', '2022-02-18 08:10:00', '2022-02-18 11:10:00', 1.2, 1.3, 1.4, 1.5),
(39, 'completed', 11761, 'T20', 'India', 'West Indies', '186-5(20.0)', '178-3(20.0)', 0, 'Field', 'West Indies', 'India win by 8 runs', 'India', '2022-02-18 13:30:00', '2022-02-18 16:30:00', 0, 0, 0, 0),
(40, 'completed', 11098, 'T20', 'Australia', 'Sri Lanka', '154-6(20.0)', '155-5(19.5)', 0, 'Bat', 'Australia', 'Sri Lanka win by 5 wickets', 'Sri Lanka', '2022-02-20 06:10:00', '2022-02-20 09:10:00', 0, 0, 0, 0),
(41, 'completed', 11762, 'T20', 'India', 'West Indies', '184-5(20.0)', '167-9(20.0)', 0, 'Field', 'West Indies', 'India win by 17 runs', 'India', '2022-02-20 13:30:00', '2022-02-20 16:30:00', 0, 0, 0, 0),
(42, 'completed', 12998, 'T20', 'Ireland', 'United Arab Emirates', '139-9(20.0)', '157-5(20.0)', 0, 'Bat', 'United Arab Emirates', 'United Arab Emirates win by 18 runs', 'United Arab Emirates', '2022-02-18 10:00:00', '2022-02-18 13:00:00', 0, 0, 0, 0),
(43, 'completed', 12999, 'T20', 'Germany', 'Bahrain', '106-10(16.4)', '107-4(15.4)', 0, 'Field', 'Bahrain', 'Bahrain win by 6 wickets', 'Bahrain', '2022-02-18 10:00:00', '2022-02-18 13:00:00', 0, 0, 0, 0),
(44, 'completed', 13000, 'T20', 'Oman', 'Canada', '159-1(18.0)', '155-6(20.0)', 0, 'Field', 'Oman', 'Oman win by 9 wickets', 'Oman', '2022-02-19 06:00:00', '2022-02-19 09:00:00', 1.2, 1.3, 1.4, 1.5),
(45, 'completed', 13001, 'T20', 'Nepal', 'Philippines', '218-3(20.0)', '82-8(20.0)', 0, 'Field', 'Philippines', 'Nepal win by 136 runs', 'Nepal', '2022-02-19 06:00:00', '2022-02-19 09:00:00', 1.9, 1.7, 2.1, 1.1),
(46, 'completed', 13002, 'T20', 'United Arab Emirates', 'Germany', '191-5(20.0)', '167-9(20.0)', 0, 'Bat', 'United Arab Emirates', 'United Arab Emirates win by 24 runs', 'United Arab Emirates', '2022-02-19 10:00:00', '2022-02-19 13:00:00', 0, 0, 0, 0),
(47, 'completed', 13003, 'T20', 'Ireland', 'Bahrain', '158-5(20.0)', '137-5(20.0)', 0, 'Bat', 'Ireland', 'Ireland win by 21 runs', 'Ireland', '2022-02-19 10:00:00', '2022-02-19 13:00:00', 0, 0, 0, 0),
(48, 'upcoming', 13004, 'T20', 'Ireland', 'Germany', '0-0 (0)', '0-0 (0)', 0, '0', '0', 'Teams will be announced at the toss', '0', '2022-02-21 06:00:00', '2022-02-21 09:00:00', 0, 0, 0, 0),
(49, 'upcoming', 13005, 'T20', 'United Arab Emirates', 'Bahrain', '0-0 (0)', '0-0 (0)', 0, '0', '0', 'Teams will be announced at the toss', '0', '2022-02-21 06:00:00', '2022-02-21 09:00:00', 0, 0, 0, 0),
(50, 'upcoming', 13006, 'T20', 'Nepal', 'Canada', '0-0 (0)', '0-0 (0)', 0, '0', '0', 'Teams will be announced at the toss', '0', '2022-02-21 10:00:00', '2022-02-21 13:00:00', 0, 0, 0, 0),
(51, 'upcoming', 13007, 'T20', 'Oman', 'Philippines', '0-0 (0)', '0-0 (0)', 0, '0', '0', 'Teams will be announced at the toss', '0', '2022-02-21 10:00:00', '2022-02-21 13:00:00', 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int NOT NULL,
  `forAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `title` text NOT NULL,
  `description` text NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `forAdmin`, `title`, `description`, `status`) VALUES
(42, 0, 'vvjhvhj', 'kjbhkjbkj', 'active'),
(43, 0, 'dbdfbdf', 'fdbdfb', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `support`
--

CREATE TABLE `support` (
  `id` int NOT NULL,
  `email` text NOT NULL,
  `issue` text NOT NULL,
  `description` text NOT NULL,
  `resolution` varchar(1000) NOT NULL DEFAULT 'In Progress',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` enum('pending','resolved') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `support`
--

INSERT INTO `support` (`id`, `email`, `issue`, `description`, `resolution`, `createdAt`, `status`) VALUES
(21, 'alone8street@gmail.com', 'Bet', 'jbjhbjh', 'In Progress', '2022-02-20 17:58:06', 'pending'),
(22, 'alone8street@gmail.com', 'Deposit', 'lknkln', 'In Progress', '2022-02-20 17:58:18', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int NOT NULL,
  `uid` int NOT NULL,
  `mode` enum('credit','debit') DEFAULT NULL,
  `amount` float NOT NULL DEFAULT '0',
  `description` text NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` enum('success','failed') NOT NULL DEFAULT 'success'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `uid`, `mode`, `amount`, `description`, `status`) VALUES
(66, 82, 'debit', -50, 'Welcome Bonus To : alone8street@gmail.com', 'success'),
(67, 82, 'credit', 10, 'booked bet on #[44] Oman(toss)', 'success'),
(68, 82, 'credit', 10, 'booked bet on #[44] Oman(result)', 'success'),
(69, 82, 'debit', -10, 'refund bet on #[44] Oman(toss)', 'success'),
(70, 82, 'debit', -10, 'refund bet on #[44] Oman(result)', 'success'),
(71, 83, 'debit', -50, 'Welcome Bonus To : er.chandreshbhai@gmail.com', 'success');

-- --------------------------------------------------------

--
-- Table structure for table `transactions_users`
--

CREATE TABLE `transactions_users` (
  `id` int NOT NULL,
  `oid` varchar(100) NOT NULL DEFAULT '0',
  `uid` int NOT NULL,
  `mode` enum('credit','debit') DEFAULT NULL,
  `amount` float NOT NULL DEFAULT '0',
  `description` text NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` enum('success','failed') NOT NULL DEFAULT 'success'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `transactions_users`
--

INSERT INTO `transactions_users` (`id`, `oid`, `uid`, `mode`, `amount`, `description`, `status`) VALUES
(30, '0', 82, 'credit', 50, 'Welcome Bonus', 'success'),
(31, '0', 82, 'debit', -10, 'booked bet on #[44] Oman(toss)', 'success'),
(32, '0', 82, 'debit', -10, 'booked bet on #[44] Oman(result)', 'success'),
(33, '0', 82, 'credit', 10, 'refund bet on #[44] Oman(toss)', 'success'),
(34, '0', 82, 'credit', 10, 'refund bet on #[44] Oman(result)', 'success'),
(35, '0', 83, 'credit', 50, 'Welcome Bonus', 'success'),
(36, '82_1645379823', 82, 'credit', 10, 'Deposit', 'success');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` text NOT NULL,
  `mobile` varchar(10) NOT NULL DEFAULT '0',
  `email` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `token` text NOT NULL,
  `wallet` float NOT NULL DEFAULT '0',
  `actualname` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'unknown',
  `accountNo` int NOT NULL DEFAULT '0',
  `ifscCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  `isVerified` tinyint(1) NOT NULL DEFAULT '0',
  `isOnline` tinyint(1) NOT NULL DEFAULT '1',
  `visits` int NOT NULL DEFAULT '1',
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `mobile`, `email`, `token`, `wallet`, `actualname`, `accountNo`, `ifscCode`, `isVerified`, `isOnline`, `visits`, `status`) VALUES
(82, 'Er Chaan', '0', 'alone8street@gmail.com', 'x', 60, 'unknown', 0, '0', 0, 0, 27, 'active'),
(83, 'er- Chaan', '0', 'er.chandreshbhai@gmail.com', 'ya29.A0ARrdaM8OOj5FTxt5NftEpTAvWY9AxswsGvQ711ooy6ZUhYdfijSXkrhD9I_pA-ngKqZkGzF_hjwu6QpDzzlsRfz1tbdDnwgw3BFvDi5PJuTzlKCG4qyCQYhsyXtJdUhZnTpKzndMpd_GP6DKZ7nsWSFrxi2GNQ', 50, 'unknown', 0, '0', 0, 1, 11, 'active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bets`
--
ALTER TABLE `bets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `board`
--
ALTER TABLE `board`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `apiId` (`apiId`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `support`
--
ALTER TABLE `support`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions_users`
--
ALTER TABLE `transactions_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bets`
--
ALTER TABLE `bets`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `board`
--
ALTER TABLE `board`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `support`
--
ALTER TABLE `support`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `transactions_users`
--
ALTER TABLE `transactions_users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
