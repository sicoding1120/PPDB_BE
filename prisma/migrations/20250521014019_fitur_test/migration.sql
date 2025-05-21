-- CreateTable
CREATE TABLE "CategoryTest" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CategoryTest_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Test" (
    "ID" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "categoryID" TEXT NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Question" (
    "ID" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "testID" TEXT NOT NULL,
    "correctID" TEXT,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "QuestionOption" (
    "ID" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "questionID" TEXT NOT NULL,

    CONSTRAINT "QuestionOption_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "StudentTest" (
    "ID" TEXT NOT NULL,
    "studentID" TEXT NOT NULL,
    "testID" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "score" DOUBLE PRECISION,

    CONSTRAINT "StudentTest_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "StudentAnswer" (
    "ID" TEXT NOT NULL,
    "studentID" TEXT NOT NULL,
    "questionID" TEXT NOT NULL,
    "selectedOptionID" TEXT NOT NULL,
    "studentTestID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentAnswer_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "CategoryTest_name_key" ON "CategoryTest"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Question_correctID_key" ON "Question"("correctID");

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES "CategoryTest"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_testID_fkey" FOREIGN KEY ("testID") REFERENCES "Test"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_correctID_fkey" FOREIGN KEY ("correctID") REFERENCES "QuestionOption"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionOption" ADD CONSTRAINT "QuestionOption_questionID_fkey" FOREIGN KEY ("questionID") REFERENCES "Question"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentTest" ADD CONSTRAINT "StudentTest_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentTest" ADD CONSTRAINT "StudentTest_testID_fkey" FOREIGN KEY ("testID") REFERENCES "Test"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAnswer" ADD CONSTRAINT "StudentAnswer_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAnswer" ADD CONSTRAINT "StudentAnswer_questionID_fkey" FOREIGN KEY ("questionID") REFERENCES "Question"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAnswer" ADD CONSTRAINT "StudentAnswer_selectedOptionID_fkey" FOREIGN KEY ("selectedOptionID") REFERENCES "QuestionOption"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAnswer" ADD CONSTRAINT "StudentAnswer_studentTestID_fkey" FOREIGN KEY ("studentTestID") REFERENCES "StudentTest"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
