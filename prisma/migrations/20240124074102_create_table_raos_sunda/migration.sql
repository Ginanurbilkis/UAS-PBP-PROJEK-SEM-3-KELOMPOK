-- CreateTable
CREATE TABLE `RaosSunda` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `makanan` VARCHAR(100) NOT NULL,
    `minuman` VARCHAR(100) NULL,
    `paket_murah` VARCHAR(100) NULL,
    `Jumlah` VARCHAR(100) NULL,
    `Harga` VARCHAR(100) NULL,
    `username` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- AddForeignKey
ALTER TABLE `RaosSunda` ADD CONSTRAINT `RaosSunda_username_fkey` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
