import getStatus, { computeAverage, EnrollmentStatus } from "./gradeUtils.js";
const enrollees = [
    { name: "Ana Cruz", prelim: 85, midterm: 90, final: 88 },
    { name: "Bea Santos", prelim: 70, midterm: 65, final: 60 },
    { name: "Cid Ramos", prelim: 95, midterm: 92, final: 97 },
    { name: "Dex Alonzo", prelim: 60, midterm: 55, final: 50 },
    { name: "Eli Tan", prelim: 78, midterm: 80, final: 76 }
];
function getEnrollees() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(enrollees);
        }, 1000);
    });
}
let batchId = "IT313-001";
function showBatchId(id) {
    if (typeof id === "string") {
        console.log(`Batch ID: ${id}`);
    }
    else {
        console.log(`Batch Number: ${id}`);
    }
}
showBatchId(batchId);
function groupBy(items, keyFn) {
    return items.reduce((groups, item) => {
        const key = keyFn(item);
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(item);
        return groups;
    }, {});
}
async function generateReport() {
    try {
        const data = await getEnrollees();
        const reports = data.map((student) => {
            const average = computeAverage(student.prelim, student.midterm, student.final);
            const status = getStatus(average);
            return {
                name: student.name,
                average,
                status,
                ...(status === EnrollmentStatus.Probation
                    ? { remarks: "Needs consultation" }
                    : {})
            };
        });
        const classAverage = reports.reduce((sum, report) => sum + report.average, 0) /
            reports.length;
        const grouped = groupBy(reports, (report) => report.status);
        console.log("\n=== IT313 Enrollment Eligibility Report (TypeScript) ===");
        reports.forEach((report) => {
            const remarks = report.remarks
                ? ` - ${report.remarks}`
                : "";
            console.log(`${report.name} - Average: ${report.average.toFixed(2)} - ${report.status}${remarks}`);
        });
        console.log(`Class Average: ${classAverage.toFixed(2)}`);
        console.log(`Passing: ${grouped[EnrollmentStatus.Passing]?.length ?? 0} / ${reports.length}`);
    }
    catch (error) {
        console.error("Failed to retrieve enrollee data:", error);
    }
}
generateReport();
