-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NULL,
    `crated_at` VARCHAR(30) NULL,
    `updated_at` VARCHAR(30) NULL,
    `email_verified_at` VARCHAR(30) NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
