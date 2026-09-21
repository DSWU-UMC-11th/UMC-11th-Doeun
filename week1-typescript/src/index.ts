
type StudyMember = {
    id: number;
    name: string;
    role: "leader" | "member";
    githubId?: string;
    studytime?: number;
};

const members: StudyMember[] = [
    { id: 1, name: "광수", role: "leader", githubId: "gwangsoo", studytime: 0 },
    { id: 2, name: "현우", role: "member" },
    { id: 3, name: "도은", role: "member", githubId: "doeun" },
];


for (let i = 0; i < members.length; i++) {
    console.log(`${members[i].id}번 ${members[i].name}님 반갑습니다.`)
    const githubidcheck = members[i].githubId ?? "깃허브 등록되지 않음.";
    console.log(githubidcheck);
    
}

let member1:StudyMember = {id: 999, name: "도도", role: "member"};
console.log(`${member1.id}번 ${member1.name}님 반갑습니다.`)
const githubidcheck = member1?.githubId ?? "등록되지 않음.";
console.log(githubidcheck);

const studyHour: number | undefined = 0
const foundMember = members.find((member) => member.id ===1);

const studytimecheck = foundMember?.studytime || 1;
console.log(studytimecheck);
const studytimecheck2 = foundMember?.studytime ?? 1;
console.log(studytimecheck2)

function formatMemberId(input: unknown){
    if (typeof input === "number"){
        console.log(`당신의 id는 ${input}입니다.`);
        return;
    }
    else if (typeof input === "string") {
        console.log(`입력한 id: ${input}`);
        return;
    }
    else {
        console.log("id를 확인할 수 없어요.");
        return;
    }
}

formatMemberId(1);
formatMemberId("안녕");
formatMemberId(false);