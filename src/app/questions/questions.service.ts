import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuestionsService {
  constructor(private p: PrismaService) {}

  async createQuestion(payload: any) {
    const question = await this.p.question.create({
      data: {
        text: payload.text,
        testID: payload.testID,
        weight: payload.weight || 1,
        options: {
          create: payload.options.map((opt: any) => ({
            label: opt.label,
            value: opt.value,
          })),
        },
      },
      include: { options: true },
    });

    const correctOption = question.options.find(
      (opt) => opt.label === payload.correctLabel,
    );

    if (!correctOption) {
      throw new HttpException('Correct option label not found', 400);
    }

    const updatedQuestion = await this.p.question.update({
      where: { ID: question.ID },
      data: { correctID: correctOption.ID },
      include: { options: true, correct: true },
    });

    return {
      message: 'Question created successfully',
      status: 201,
      data: updatedQuestion,
    };
  }

  async createBulkQuestions(payload: any[]) {
    return this.p.$transaction(async (tx) => {
      const result = [];

      for (const question of payload) {
        const { text, weight, testID, correctValue, options } = question;

        // Step 1: Create question with options
        const createdQuestion = await tx.question.create({
          data: {
            text,
            weight,
            testID,
            options: {
              create: options.map((opt: any) => ({
                label: opt.label,
                value: opt.value,
              })),
            },
          },
          include: {
            options: true,
          },
        });

        // Step 2: Find the correct option
        const correctOption = createdQuestion.options.find(
          (opt) => opt.label === correctValue,
        );

        if (!correctOption) {
          throw new Error(`Correct option '${correctValue}' not found`);
        }

        // Step 3: Update question with correctID
        const updatedQuestion = await tx.question.update({
          where: { ID: createdQuestion.ID },
          data: {
            correctID: correctOption.ID,
          },
        });

        result.push(updatedQuestion);
      }

      return result;
    });
  }

  async getAllQuestions() {
    const questions = await this.p.question.findMany({
      include: { options: true, correct: true, test: true },
    });

    return {
      message: 'All questions retrieved',
      status: 200,
      data: questions,
    };
  }

  async getQuestionById(id: string) {
    const question = await this.p.question.findUnique({
      where: { ID: id },
      include: { options: true, correct: true },
    });

    if (!question) throw new NotFoundException('Question not found');

    return {
      message: 'Question found',
      status: 200,
      data: question,
    };
  }

  async updateQuestion(id: string, payload: any) {
    // Update question utama
    await this.p.question.update({
      where: { ID: id },
      data: {
        text: payload.text,
        weight: payload.weight,
        testID: payload.testID,
      },
    });

    // Update options satu per satu (jika ada)
    if (payload.options && Array.isArray(payload.options)) {
      for (const opt of payload.options) {
        // Pastikan option punya ID untuk update
        if (!opt.ID) continue;

        await this.p.questionOption.update({
          where: { ID: opt.ID },
          data: {
            label: opt.label,
            value: opt.value,
          },
        });
      }
    }

    // Update correctID jika ada correctLabel
    if (payload.correctLabel) {
      const options = await this.p.questionOption.findMany({
        where: { questionID: id },
      });

      const correctOption = options.find(
        (opt) => opt.label === payload.correctLabel,
      );

      if (!correctOption) {
        throw new HttpException('Correct option label not found', 400);
      }

      await this.p.question.update({
        where: { ID: id },
        data: { correctID: correctOption.ID },
      });
    }

    // Ambil data question terbaru
    const updated = await this.p.question.findUnique({
      where: { ID: id },
      include: { options: true, correct: true },
    });

    return {
      message: 'Question updated',
      status: 200,
      data: updated,
    };
  }

  async deleteQuestion(id: string) {
    const question = await this.p.question.findUnique({ where: { ID: id } });
    if (!question) throw new NotFoundException('Question not found');

    await this.p.questionOption.deleteMany({ where: { questionID: id } });
    await this.p.question.delete({ where: { ID: id } });

    return {
      message: 'Question deleted successfully',
      status: 200,
    };
  }

  async getQuestionsByTestID(testID: string) {
    const questions = await this.p.question.findMany({
      where: { testID },
      include: { options: true, correct: true },
    });

    return {
      message: `Questions for test ${testID} retrieved`,
      status: 200,
      data: questions,
    };
  }
  async updateOption(
    optionID: string,
    payload: { label: string; value: string },
  ) {
    const option = await this.p.questionOption.findUnique({
      where: { ID: optionID },
    });
    if (!option) throw new NotFoundException('Option not found');

    const updated = await this.p.questionOption.update({
      where: { ID: optionID },
      data: {
        label: payload.label,
        value: payload.value,
      },
    });

    return {
      message: 'Option updated successfully',
      status: 200,
      data: updated,
    };
  }

  async deleteOption(optionID: string) {
    const option = await this.p.questionOption.findUnique({
      where: { ID: optionID },
      include: { correctFor: true },
    });

    if (!option) throw new NotFoundException('Option not found');

    // Jika option ini adalah correct answer, reset correctID di Question
    if (option.correctFor) {
      await this.p.question.update({
        where: { ID: option.questionID },
        data: { correctID: null },
      });
    }

    await this.p.questionOption.delete({
      where: { ID: optionID },
    });

    return {
      message: 'Option deleted successfully',
      status: 200,
    };
  }

  async getQuestionsByCategory(query: { testID?: string; weight?: number }) {
    const filters: any = {};

    if (query.testID) filters.testID = query.testID;
    if (query.weight) filters.weight = query.weight;

    const questions = await this.p.question.findMany({
      where: filters,
      include: {
        options: true,
        correct: true,
        test: true,
      },
    });

    // const test = await this.p.test.findUnique({
    //   where: { ID: query.testID },
    //   include: { category: true },
    // })
    // let data;
    // data = {
    //   ...questions,
    //   ...test
    // }

    return {
      message: 'Filtered questions fetched successfully',
      status: 200,
      data: questions,
    };
  }
}
