function A1() {
    const newArraySet = (a, b) => [
        ...new Set([...a.filter(v => !b.includes(v)), ...b.filter(v => !a.includes(v))])
    ];
    console.log(newArraySet([1, 2, "a"], [1, 3, "b"]));
}
var footBallTeam = [
    {
        name: "Arsenal",
        points: 99,
        GD: 45
    },
    {
        name: "Chelsea",
        points: 75,
        GD: 39
    },
    {
        name: "MU",
        points: 60,
        GD: 29
    },
    {
        name: "Liverpool",
        points: 88,
        GD: 39
    },
    {
        name: prompt("Nhập vào tên đội bóng"),
        points: Number(prompt("Nhập vào điểm số")),
        GD: Number(prompt("Nhập vào hệ số bàn thắng bại"))
    }]
function print(footBallTeam) {
    for (var i = 0; i < footBallTeam.length; i++) {
        const keyAndValue = footBallTeam[i];
        console.log(`#${i + 1}`);
        for (const key in keyAndValue) {
            const value = keyAndValue[key];
            console.log(`${key} : ${value}`)
        }
    }
}
function sort() {
    let sortTeam = footBallTeam.sort(function(a, b){
        if(a.points == b.points){
            return a.GD - b.GD
        }
        else{
        return b.points - a.points    
        }
    })     
    // console.log(sortTeam);
    print(sortTeam)
    }
sort()