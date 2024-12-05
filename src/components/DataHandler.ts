interface StatsProps {
    data: any;
}

interface ProcessedStats {
    fw: number;
    bw: number;
}

export function processNumberStats(props: StatsProps): ProcessedStats {

    let fw = 0;
    let bw = 0;

    props.data = props.data.measurement.map((m: any) => {
        m.value.forEach((v: any) => {
            if (v.label === "fw") {
                fw += v.value;
            } else if (v.label === "bw") {
                bw += v.value;
            }
        });
    });
    return { fw, bw };
}

export default function processGraphStats(props: any): any {
    let result: { date: string; time: string; visitors: number }[] = [];
    let counter = 0;
    
    props.data = props.data.measurement.map((m: any) => {
        
        m.value.forEach((v: any) => {
            if (v.label === "fw") {
                counter += v.value;
            } else if (v.label === "bw") {
                counter -= v.value;
            }
        });

        result.push({ date: m.to, time: `${m.to.hour}:${m.to.minute}`, visitors: counter });
    });

    return result;
}

// {
//     "images": [
//         "url1",
//         "url2"
//     ],
//     "data": [
//         {
//             "element-id": 1,
//             "from": "string",
//             "to": "string",
//             "label": "fw",
//             "measurement": [
//                 {
//                     "from": "string",
//                     "to": "string",
//                     "value": "number"
//                 },
//                 {
//                     "from": "string",
//                     "to": "string",
//                     "value": "number"
//                 }, ....
//             ]
//         }, 
//         {
//             "element-id": 2,
//             "from": "string",
//             "to": "string",
//             "label": "bw",
//             "measurement": [
//                 {
//                     "from": "string",
//                     "to": "string",
//                     "value": "number"
//                 },
//                 {
//                     "from": "string",
//                     "to": "string",
//                     "value": "number"
//                 }, ....
//             ]
//         }
//     ]
// }