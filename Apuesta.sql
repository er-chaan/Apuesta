-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 17, 2022 at 09:47 PM
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
  `status` enum('booked','won','lost','') NOT NULL DEFAULT 'booked'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `bets`
--

INSERT INTO `bets` (`id`, `uid`, `bid`, `type`, `team`, `rate`, `amount`, `status`) VALUES
(1, 77, 38, 'toss', 'Australia', 1.2, 10, 'booked'),
(2, 77, 38, 'toss', 'Sri Lanka', 1.3, 10, 'booked'),
(3, 77, 38, 'result', 'Australia', 1.4, 10, 'booked'),
(4, 77, 38, 'result', 'Sri Lanka', 1.5, 10, 'booked');

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
  `scoreA` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0-0 (0)',
  `scoreB` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0-0 (0)',
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
(37, 'inProgress', 11907, 'Test', 'New Zealand', 'South Africa', '116-3(39.0)', '95-10(49.2)', 1, 'Field', 'New Zealand', 'Stumps: New Zealand lead South Africa by 21 runs with 7 wickets remaining', '0', '2022-02-16 22:00:00', '2022-02-21 05:00:00', 0, 0, 0, 0),
(38, 'upcoming', 11099, 'T20', 'Australia', 'Sri Lanka', '0-0 (0)', '0-0 (0)', 0, '0', '0', NULL, '0', '2022-02-18 08:10:00', '2022-02-18 11:10:00', 1.2, 1.3, 1.4, 1.5),
(39, 'upcoming', 11761, 'T20', 'India', 'West Indies', '0-0 (0)', '0-0 (0)', 0, '0', '0', NULL, '0', '2022-02-18 13:30:00', '2022-02-18 16:30:00', 0, 0, 0, 0),
(40, 'upcoming', 11098, 'T20', 'Australia', 'Sri Lanka', '0-0 (0)', '0-0 (0)', 0, '0', '0', NULL, '0', '2022-02-20 06:10:00', '2022-02-20 09:10:00', 0, 0, 0, 0),
(41, 'upcoming', 11762, 'T20', 'India', 'West Indies', '0-0 (0)', '0-0 (0)', 0, '0', '0', NULL, '0', '2022-02-20 13:30:00', '2022-02-20 16:30:00', 0, 0, 0, 0);

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
(1, 0, 'titleeeeee', 'descccccccccc', 'active'),
(2, 0, 'titleeeeee', 'descccccccccc', 'active'),
(3, 0, 'titleeeeee', 'descccccccccc', 'active'),
(4, 0, 'titleeeeee', 'descccccccccc', 'active'),
(5, 0, 'titleeeeee', 'descccccccccc', 'active'),
(6, 0, 'titleeeeee', 'descccccccccc', 'active'),
(7, 0, 'titleeeeee', 'descccccccccc', 'active'),
(8, 0, 'titleeeeee', 'descccccccccc', 'inactive'),
(10, 1, 'Insufficiant Fund in API', 'CashOUT - Transaction Failed : alone8street@gmail.com of 100 but API Fund is -10.80', 'active'),
(11, 1, 'Insufficiant Fund in API', 'CashOUT - Transaction Failed : alone8street@gmail.com of 100 but API Fund is -10.80', 'active'),
(12, 1, 'Insufficiant Fund in API', 'CashOUT - Transaction Failed : alone8street@gmail.com of 100 but API Fund is -10.80', 'active'),
(13, 1, 'Insufficient API balance', 'CashOUT - Transaction Failed : alone8street@gmail.com of 100 but API Fund is undefined', 'active'),
(14, 1, 'Insufficient API balance', 'CashOUT - Transaction Failed : alone8street@gmail.com of 100 but API Fund is undefined', 'active'),
(15, 1, 'Insufficient API balance', 'CashOUT - Transaction Failed : alone8street@gmail.com of 100 but API Fund is undefined', 'active'),
(16, 1, 'Insufficient API balance', 'CashOUT - Transaction Failed : alone8street@gmail.com of 150.5 but API Fund is undefined', 'active'),
(17, 1, 'Insufficient API balance', 'CashOUT - Transaction Failed : alone8street@gmail.com of 150.5 but API Fund is undefined', 'active'),
(18, 1, 'Insufficient API balance', 'CashOUT - Transaction Failed : alone8street@gmail.com of 150.2 but API Fund is undefined', 'active'),
(19, 1, 'Insufficient API balance', 'CashOUT - Transaction Failed : alone8street@gmail.com of 100 but API Fund is undefined', 'active'),
(20, 1, 'Insufficient API balance', 'CashOUT - Transaction Failed : alone8street@gmail.com of 100 but API Fund is undefined', 'active'),
(21, 1, 'Insufficient API balance', 'CashOUT - Transaction Failed : alone8street@gmail.com of 100 but API Fund is undefined', 'active'),
(22, 1, 'Insufficient API balance', 'CashOUT - Transaction Failed : alone8street@gmail.com of 50 but API Fund is undefined', 'active'),
(23, 1, 'Insufficient API balance', 'CashOUT - Transaction Failed : alone8street@gmail.com of 50 but API Fund is undefined', 'active'),
(24, 1, 'Insufficient API balance', 'CashOUT - Transaction Failed : alone8street@gmail.com of 50 but API Fund is undefined', 'active'),
(25, 1, 'Insufficient API balance', 'CashOUT - Transaction Failed : alone8street@gmail.com of 50 but API Fund is undefined', 'active'),
(26, 1, 'Insufficient API balance', 'CashOUT - Transaction Failed : alone8street@gmail.com of 100.43 but API Fund is undefined', 'active'),
(27, 1, 'Insufficient API balance', 'CashOUT - Transaction Failed : alone8street@gmail.com of 100.34 but API Fund is undefined', 'active'),
(28, 1, 'Insufficient API balance', 'CashOUT - Transaction Failed : alone8street@gmail.com of 100.23 but API Fund is undefined', 'active'),
(29, 1, 'Insufficient API balance', 'CashOUT - Transaction Failed : alone8street@gmail.com of 10 but API Fund is undefined', 'active'),
(30, 1, 'Insufficient API balance', 'CashOUT - Transaction Failed : alone8street@gmail.com of 110 but API Fund is undefined', 'active'),
(31, 1, 'Insufficient API balance', 'CashOUT - Transaction Failed : alone8street@gmail.com of 110 but API Fund is undefined', 'active'),
(32, 1, 'Insufficient API balance', 'CashOUT - Transaction Failed : alone8street@gmail.com of 10 but API Fund is undefined', 'active');

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
(16, 'alone8street@gmail.com', 'Bet', 'drsgvdf', 'procedure explained', '2022-02-10 07:53:42', 'resolved'),
(17, 'alone8street@gmail.com', 'Bet', 'dfvdf', 'In Progress', '2022-02-10 07:53:48', 'pending'),
(18, 'alone8street@gmail.com', 'Bet', 'dfbvdf', 'In Progress', '2022-02-10 07:55:52', 'pending'),
(19, 'alone8street@gmail.com', 'Transactions', 'hjh', 'In Progress', '2022-02-10 11:28:23', 'pending'),
(20, 'alone8street@gmail.com', 'Deposit', 'hkjbk', 'In Progress', '2022-02-11 11:23:29', 'pending');

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
(5, 75, 'debit', -50, 'Welcome Bonus To : alone8street@gmail.com', 'success'),
(6, 76, 'debit', -50, 'Welcome Bonus To : alone8street@gmail.com', 'success'),
(7, 77, 'debit', -50, 'Welcome Bonus To : alone8street@gmail.com', 'success'),
(8, 78, 'debit', -50, 'Welcome Bonus To : er.chandreshbhai@gmail.com', 'success'),
(9, 77, 'credit', 50, 'booked bet on [39] India-result', 'success'),
(10, 77, 'credit', 25, 'booked bet on [40] Australia-toss', 'success'),
(11, 77, 'credit', 40, 'booked bet on #[38] Australia-result', 'success'),
(12, 77, 'credit', 10, 'booked bet on #[38] Australia-result', 'success'),
(13, 77, 'credit', 10, 'booked bet on #[38] Australia-result', 'success'),
(14, 77, 'credit', 10, 'booked bet on #[38] Australia-toss', 'success'),
(15, 77, 'credit', 10, 'booked bet on #[38] Australia-result', 'success'),
(16, 77, 'credit', 10, 'booked bet on #[38] Australia-result', 'success'),
(17, 77, 'credit', 10, 'booked bet on #[38] Sri Lanka-result', 'success'),
(18, 77, 'credit', 10, 'booked bet on #[39] West Indies-result', 'success'),
(19, 77, 'credit', 10, 'booked bet on #[38] Australia-result', 'success'),
(20, 77, 'credit', 10, 'booked bet on #[39] India-result', 'success'),
(21, 77, 'credit', 10, 'booked bet on #[38] Australia-result', 'success'),
(22, 77, 'credit', 10, 'booked bet on #[39] India-result', 'success'),
(23, 77, 'credit', 10, 'booked bet on #[39] India-result', 'success'),
(24, 77, 'credit', 10, 'booked bet on #[39] India-toss', 'success'),
(25, 77, 'credit', 10, 'booked bet on #[38] Sri Lanka-result', 'success'),
(26, 77, 'credit', 10, 'booked bet on #[38] Australia-result', 'success'),
(27, 77, 'credit', 10, 'booked bet on #[39] West Indies-result', 'success'),
(28, 77, 'credit', 10, 'booked bet on #[38] Australia-result', 'success'),
(29, 77, 'credit', 10, 'booked bet on #[38] Australia-result', 'success'),
(30, 77, 'credit', 10, 'booked bet on #[38] Australia-result', 'success'),
(31, 77, 'credit', 10, 'booked bet on #[38] Australia-toss', 'success'),
(32, 77, 'credit', 10, 'booked bet on #[38] Sri Lanka-toss', 'success'),
(33, 77, 'credit', 10, 'booked bet on #[38] Australia-result', 'success'),
(34, 77, 'credit', 10, 'booked bet on #[38] Sri Lanka-result', 'success');

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
(10, '0', 75, 'credit', 50, 'Welcome Bonus', 'success'),
(12, '0', 75, 'credit', 34, 'fhbfgth', 'success'),
(13, '0', 76, 'credit', 50, 'Welcome Bonus', 'success'),
(14, '0', 77, 'credit', 50, 'Welcome Bonus', 'success'),
(15, '0', 77, 'debit', 100, 'Withdraw', 'success'),
(16, '0', 77, 'debit', -100, 'Withdraw', 'success'),
(17, '0', 77, 'debit', -100, 'Withdraw', 'success'),
(18, '0', 77, 'debit', -150, 'Withdraw', 'success'),
(19, '0', 77, 'debit', -50, 'Withdraw', 'success'),
(20, '0', 77, 'debit', -100, 'Withdraw', 'success'),
(21, '77_1644667822', 77, 'credit', 100, 'Deposit', 'success'),
(22, '77_1644668269', 77, 'credit', 100, 'Deposit', 'success'),
(23, '77_1644668387', 77, 'credit', 100.43, 'Deposit', 'success'),
(24, '0', 77, 'debit', -100, 'Withdraw', 'success'),
(25, '0', 77, 'debit', -100, 'Withdraw', 'success'),
(26, 'mta_1644668695', 77, 'debit', -100, 'Withdraw', 'success'),
(27, '77_1644669385', 77, 'credit', 100, 'Deposit', 'success'),
(28, 'mta_1644669720', 77, 'debit', -100, 'Withdraw', 'success'),
(29, '77_1644669995', 77, 'credit', 100, 'Deposit', 'success'),
(30, 'mta_1644670209', 77, 'debit', -100, 'Withdraw', 'success'),
(31, '77_1644690601', 77, 'credit', 100, 'Deposit', 'success'),
(32, '77_1644691516', 77, 'credit', 10, 'Deposit', 'success'),
(33, '77_1644948353', 77, 'credit', 10, 'Deposit', 'success'),
(34, 'mta_1644948480', 77, 'debit', -10, 'Withdraw', 'success'),
(35, 'mta_1644948488', 77, 'debit', -10, 'Withdraw', 'success'),
(36, '0', 78, 'credit', 50, 'Welcome Bonus', 'success'),
(37, '0', 77, 'debit', -10, 'booked bet on [38] Sri Lanka-toss', 'success'),
(38, '0', 77, 'debit', -10, 'booked bet on [38] Sri Lanka-toss', 'success'),
(39, '0', 77, 'credit', 10, 'booked bet on [38] Sri Lanka-toss', 'success'),
(40, '0', 77, 'debit', -50, 'booked bet on [39] India-result', 'success'),
(41, '0', 77, 'debit', -25, 'booked bet on [40] Australia-toss', 'success'),
(42, '0', 77, 'debit', -40, 'booked bet on #[38] Australia-result', 'success'),
(43, '0', 77, 'debit', -10, 'booked bet on #[38] Australia-result', 'success'),
(44, '0', 77, 'debit', -10, 'booked bet on #[38] Australia-result', 'success'),
(45, '0', 77, 'debit', -10, 'booked bet on #[38] Australia-toss', 'success'),
(46, '0', 77, 'debit', -10, 'booked bet on #[38] Australia-result', 'success'),
(47, '0', 77, 'debit', -10, 'booked bet on #[38] Australia-result', 'success'),
(48, '0', 77, 'debit', -10, 'booked bet on #[38] Sri Lanka-result', 'success'),
(49, '0', 77, 'debit', -10, 'booked bet on #[39] West Indies-result', 'success'),
(50, '0', 77, 'debit', -10, 'booked bet on #[38] Australia-result', 'success'),
(51, '0', 77, 'debit', -10, 'booked bet on #[39] India-result', 'success'),
(52, '0', 77, 'debit', -10, 'booked bet on #[38] Australia-result', 'success'),
(53, '0', 77, 'debit', -10, 'booked bet on #[39] India-result', 'success'),
(54, '0', 77, 'debit', -10, 'booked bet on #[39] India-result', 'success'),
(55, '0', 77, 'debit', -10, 'booked bet on #[39] India-toss', 'success'),
(56, '0', 77, 'debit', -10, 'booked bet on #[38] Sri Lanka-result', 'success'),
(57, '0', 77, 'debit', -10, 'booked bet on #[38] Australia-result', 'success'),
(58, '0', 77, 'debit', -10, 'booked bet on #[39] West Indies-result', 'success'),
(59, '0', 77, 'debit', -10, 'booked bet on #[38] Australia-result', 'success'),
(60, '0', 77, 'debit', -10, 'booked bet on #[38] Australia-result', 'success'),
(61, '0', 77, 'debit', -10, 'booked bet on #[38] Australia-result', 'success'),
(62, '77_1645113697', 77, 'credit', 10, 'Deposit', 'success'),
(63, '0', 77, 'debit', -10, 'booked bet on #[38] Australia-toss', 'success'),
(64, '0', 77, 'debit', -10, 'booked bet on #[38] Australia-toss', 'success'),
(65, '0', 77, 'debit', -10, 'booked bet on #[38] Australia-toss', 'success'),
(66, '0', 77, 'debit', -10, 'booked bet on #[38] Sri Lanka-toss', 'success'),
(67, '0', 77, 'debit', -10, 'booked bet on #[38] Australia-result', 'success'),
(68, '0', 77, 'debit', -10, 'booked bet on #[38] Sri Lanka-result', 'success');

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
(77, 'Er Chaan', '1000000000', 'alone8street@gmail.com', 'ya29.A0ARrdaM8jMgmzRN6tO-uAYdkD6Dl0rccLBpXwQNJics-ks-B_KLoGAi_T05aaLntqHpAFQOflcbvnWw1sxil_q_wVd6iHO20u_DeXmEmoQyAdRmxVoE6LV07XBq43vvWsSZgUuE6x8e8rv4sqw2x4qtiMWJmczg', 390, 'Unknown', 10133323, 'fdgeergfdrfg', 1, 1, 32, 'active'),
(78, 'er- Chaan', '0', 'er.chandreshbhai@gmail.com', 'ya29.A0ARrdaM8Ep4W9pomKbakiYz8DEO9CXJ7jV0qWKYfkCUcfJedrkAvMa2PN-iRsLNMPFrlkF4U9_-5TyIRleXN_15Qj1MEqY5BPsp9bls1DevxxUKCU33tJSKfGfZqwmoS7SUogseQ3_W6Sld8xBA7sw3LfwOfa2g', 50, 'unknown', 0, '0', 0, 1, 1, 'active');

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `board`
--
ALTER TABLE `board`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `support`
--
ALTER TABLE `support`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `transactions_users`
--
ALTER TABLE `transactions_users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
