-- CreateEnum
CREATE TYPE "enum_Counselings_arrivalType" AS ENUM ('voluntary', 'called', 'referral');

-- CreateEnum
CREATE TYPE "enum_Counselings_counselingType" AS ENUM ('Layanan Dasar - Seminar', 'Layanan Dasar - Klasikal', 'Layanan Responsive', 'Layanan Penempatan dan Perencanaan Individual');

-- CreateEnum
CREATE TYPE "enum_Counselings_status" AS ENUM ('pending', 'completed');

-- CreateEnum
CREATE TYPE "enum_Students_status" AS ENUM ('active', 'graduated', 'dropped');

-- CreateEnum
CREATE TYPE "enum_Users_role" AS ENUM ('admin', 'superadmin');

-- CreateTable
CREATE TABLE "Classes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATE,

    CONSTRAINT "Classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CounselingLogs" (
    "id" SERIAL NOT NULL,
    "activity" VARCHAR(255),
    "userId" INTEGER,
    "counselingId" INTEGER,
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATE,

    CONSTRAINT "CounselingLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Counselings" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "notes" TEXT,
    "date" DATE NOT NULL,
    "counselingType" "enum_Counselings_counselingType" NOT NULL,
    "arrivalType" "enum_Counselings_arrivalType" NOT NULL DEFAULT 'called',
    "status" "enum_Counselings_status" NOT NULL DEFAULT 'pending',
    "isGroup" BOOLEAN NOT NULL DEFAULT false,
    "counselorId" INTEGER NOT NULL,
    "NISN" VARCHAR(255) NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATE,

    CONSTRAINT "Counselings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SequelizeMeta" (
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Students" (
    "id" SERIAL NOT NULL,
    "NISN" VARCHAR(255) NOT NULL,
    "NIS" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "classId" INTEGER,
    "phoneNo" VARCHAR(255) NOT NULL,
    "address" TEXT NOT NULL,
    "healthHistory" TEXT,
    "email" VARCHAR(255) NOT NULL,
    "dateOfBirth" DATE NOT NULL,
    "placeOfBirth" VARCHAR(255) NOT NULL,
    "universityTarget" VARCHAR(255),
    "status" "enum_Students_status" NOT NULL,
    "guardianName" VARCHAR(255) NOT NULL,
    "guardianJob" VARCHAR(255) NOT NULL,
    "guardianPhoneNo" VARCHAR(255) NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATE,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "role" "enum_Users_role" NOT NULL DEFAULT 'admin',
    "password" TEXT NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATE,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- AddForeignKey
ALTER TABLE "CounselingLogs" ADD CONSTRAINT "CounselingLogs_counselingId_fkey" FOREIGN KEY ("counselingId") REFERENCES "Counselings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CounselingLogs" ADD CONSTRAINT "CounselingLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Counselings" ADD CONSTRAINT "Counselings_counselorId_fkey" FOREIGN KEY ("counselorId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
