export declare const createSubmissionService: (data: any) => Promise<{
    message: string;
    submission: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        submittedAt: Date;
        status: string;
        feedback: string | null;
        assignmentId: string;
        studentId: string;
    };
}>;
export declare const getAllSubmissionsService: (mentorId?: string) => Promise<{
    message: string;
    submissions: ({
        assignment: {
            id: string;
            title: string;
            description: string;
            dueDate: Date;
            mentorId: string;
            createdAt: Date;
            updatedAt: Date;
        };
        student: {
            email: string;
            name: string;
            id: string;
            mentorId: string;
            createdAt: Date;
            updatedAt: Date;
            password: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        submittedAt: Date;
        status: string;
        feedback: string | null;
        assignmentId: string;
        studentId: string;
    })[];
}>;
export declare const getSubmissionByIdService: (id: string) => Promise<{
    message: string;
    submission: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        submittedAt: Date;
        status: string;
        feedback: string | null;
        assignmentId: string;
        studentId: string;
    };
}>;
export declare const getByAssignmentService: (assignmentId: string) => Promise<{
    message: string;
    submissions: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        submittedAt: Date;
        status: string;
        feedback: string | null;
        assignmentId: string;
        studentId: string;
    }[];
}>;
export declare const getByStudentService: (studentId: string) => Promise<{
    message: string;
    submissions: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        submittedAt: Date;
        status: string;
        feedback: string | null;
        assignmentId: string;
        studentId: string;
    }[];
}>;
export declare const reviewSubmissionService: (id: string, data: any, mentorId?: string) => Promise<{
    message: string;
    submission: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        submittedAt: Date;
        status: string;
        feedback: string | null;
        assignmentId: string;
        studentId: string;
    };
}>;
//# sourceMappingURL=submission.service.d.ts.map