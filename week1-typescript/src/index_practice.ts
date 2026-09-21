/*

const courseName = "TypeScript_real";
console.log("이번 주 학습 주제: "+courseName);

const memberNames = ["광수"];
console.log(memberNames[0].toUpperCase());

function introduceStudent(studentName: string, currentLevel: number){
    return studentName + "님은 현재 "+ currentLevel + "레벨이에요.";
}


let studentName = "광수";
let currentLevel = 1;
let isCompleted = false;

console.log(studentName, currentLevel, isCompleted);

const studyMember = {name: "광수"};
studyMember.name = "지수";

console.log(studyMember.name);

studyMember = {name: "현우"};

let myname = "도은";
let currentweek = 1;
let iscomplete = false;

const studycontent:string[] = ["js", "ts", "react"];

const ob1 = [1];
const ob2 = [1];

console.log(ob1 === ob2);


type MemberProfile = {
    name: string;
};

type GithubProfile = {
    githubId: string;
};

type MemberWithGithub = MemberProfile & GithubProfile;

const gwangsooProfile: MemberWithGithub = {
    name: "광수",
    githubId: "gwangsoo",
};

console.log(gwangsooProfile.name, gwangsooProfile.githubId);


type StudentName = string;
interface StudyMember {
    name: StudentName;
}

interface StudyMember {
    level: number;
}

const member: StudyMember = {
    name: "광수",
    level: 1,
};


type StudyMember = {
    name: string;
    level: number;
    isLeader: boolean;
};

const member: StudyMember = {
    name: "광수",
    level: 1,
    isLeader: false,
};

function createMemberCard(studymember: StudyMember) {
    return studymember.name+" 님, "+studymember.level+"레벨";
}

console.log(createMemberCard(member));

type MemberRole = "leader" | "member";

function printMemberRole(role: MemberRole) {
    if (role === "leader") {
        console.log("스터디를 이끌어요.");
        return;
    }
    else {
        console.log("스터디에 참여해요.");
        return;
    }
}

printMemberRole("leader");


type StudyMember = {
    name: string;
    githubId?: string;
    studytime?: number;
};

const members: StudyMember[] = [
    { name: "광수", githubId: "gwangsoo", studytime: 10 },
    { name: "지수", studytime: 0 },
];

let selectedMember: StudyMember | null = null;
const foundMember = members.find((member) => member.name ==="지수");

//console.log(selectedMember);
//console.log(foundMember);

if(foundMember) {
    console.log(foundMember.name);
} else {
    console.log("스터디원을 찾을 수 없어요.");
}

const studytimecheck = foundMember?.studytime ?? null;
console.log(studytimecheck);

const githubidcheck = foundMember?.githubId ?? "등록되지 않음.";
console.log(githubidcheck);

function formatStudyWeek(week: unknown) {
    if (typeof week === "number"){
        console.log(`현재 ${week}주차예요.`);
        return;
    }
    else if (typeof week === "string") {
        console.log(`입력한 주차: ${week}`);
        return;
    }
    else {
        console.log("주차를 확인할 수 없어요.");
        return;
    }
}

formatStudyWeek(1);
formatStudyWeek("1");
formatStudyWeek(true);

function createBox<T>(value: T){
    return { value };
}

const box1 = createBox(123);
const box2 = createBox("Hello");
const box3 = createBox(members);

console.log(box1.value);
console.log(box2.value);
console.log(box3.value);


type WeeklyGoal = {
    title: string;
    targetCount: number;
};

const weeklyGoal: WeeklyGoal = {
    title: "TypeScript 예제 연습",
    targetCount: 3,
};

function printGoal(goal: WeeklyGoal): string {
    return goal.title;
}

*/