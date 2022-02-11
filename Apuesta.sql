-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 11, 2022 at 04:56 PM
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
(18, 1, 'Insufficient API balance', 'CashOUT - Transaction Failed : alone8street@gmail.com of 150.2 but API Fund is undefined', 'active');

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
(7, 77, 'debit', -50, 'Welcome Bonus To : alone8street@gmail.com', 'success');

-- --------------------------------------------------------

--
-- Table structure for table `transactions_users`
--

CREATE TABLE `transactions_users` (
  `id` int NOT NULL,
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

INSERT INTO `transactions_users` (`id`, `uid`, `mode`, `amount`, `description`, `status`) VALUES
(10, 75, 'credit', 50, 'Welcome Bonus', 'success'),
(12, 75, 'credit', 34, 'fhbfgth', 'success'),
(13, 76, 'credit', 50, 'Welcome Bonus', 'success'),
(14, 77, 'credit', 50, 'Welcome Bonus', 'success'),
(15, 77, 'debit', 100, 'Withdraw', 'success'),
(16, 77, 'debit', -100, 'Withdraw', 'success'),
(17, 77, 'debit', -100, 'Withdraw', 'success'),
(18, 77, 'debit', -150, 'Withdraw', 'success');

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
(77, 'Er Chaan', '1000000000', 'alone8street@gmail.com', 'ya29.A0ARrdaM8tVNA4kL1ZngsOqRgpbD2RCT1ojBuTH7QMFFUCGVkxP7cvzFkWB4R9RITNvnxY87fXiFGGAJrTJVKzbzzY-YV3PQPCusq76s8cUSwQKhWNLTmutLBi1cbsNA1DVDfdvAOBob6iB4WQIwYLkTkcGrNSiw', 450, 'Unknown', 10133323, 'dgdfgsdsd', 1, 1, 13, 'active');

--
-- Indexes for dumped tables
--

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
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `support`
--
ALTER TABLE `support`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `transactions_users`
--
ALTER TABLE `transactions_users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
