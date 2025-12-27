export declare const createStudentService: (data: any) => Promise<{
    message: string;
    student: {
        email: string;
        name: string;
        id: string;
        mentorId: string;
        createdAt: Date;
        updatedAt: Date;
        password: string;
    };
}>;
export declare const getAllStudentsService: (page?: number, limit?: number, mentorId?: string) => Promise<{
    message: string;
    students: {
        email: string;
        name: string;
        id: string;
        mentorId: string;
        createdAt: Date;
        updatedAt: Date;
        password: string;
    }[];
    total: number;
    page: number;
    totalPages: number;
}>;
export declare const getStudentByIdService: (id: string) => Promise<{
    message: string;
    student: {
        email: string;
        name: string;
        id: string;
        mentorId: string;
        createdAt: Date;
        updatedAt: Date;
        password: string;
    };
}>;
export declare const updateStudentService: (id: string, data: any, mentorId?: string) => Promise<{
    message: string;
    student: {
        email: string;
        name: string;
        id: string;
        mentorId: string;
        createdAt: Date;
        updatedAt: Date;
        password: string;
    };
}>;
export declare const deleteStudentService: (id: string, mentorId?: string) => Promise<{
    message: string;
}>;
export declare const getStudentProgressService: (studentId: string, mentorId?: string) => Promise<{
    studentId: string;
    totalAssignments: number;
    completedSubmissions: number;
    progressPercentage: number;
}>;
//# sourceMappingURL=student.service.d.ts.map