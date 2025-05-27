import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentAnswerService {
    constructor(private p: PrismaService){}

    async answerQuestion(payload: any) {
        const existedQuestion = await this.p.studentAnswer.findFirst({
            where: {
                studentID: payload.studentID,
                questionID: payload.questionID,
                studentTestID: payload.studentTestID
            }
        })


        if (existedQuestion) {
            const updateAnswer = await this.p.studentAnswer.update({
                where: {
                    ID: existedQuestion.ID,
                }, data: {
                    selectedOptionID: payload.selectedOptionID
                }
            })

            return {
                message: "Answer updated successfully",
                status: 200,
                data: updateAnswer
            }
        }

        const answerQuestion = await this.p.studentAnswer.create({
            data: payload
        });

        return {
            message: "Answer submitted successfully",
            status: 201,
            data: answerQuestion
        }
    }

    async getAnswerByStudentTestID(studentTestID: string) {
        const answers = await this.p.studentAnswer.findMany({
            where: {
                studentTestID: studentTestID
            },
            include: {
                question: true,
                selectedOption: true
            }
        });

        return {
            message: "Answers retrieved successfully",
            status: 200,
            data: answers
        }
    }
}
