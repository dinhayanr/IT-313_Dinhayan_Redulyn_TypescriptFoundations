export var EnrollmentStatus;
(function (EnrollmentStatus) {
    EnrollmentStatus["Passing"] = "PASSING";
    EnrollmentStatus["Probation"] = "PROBATION";
})(EnrollmentStatus || (EnrollmentStatus = {}));
export function computeAverage(prelim, midterm, final) {
    return (prelim + midterm + final) / 3;
}
export default function getStatus(average) {
    return average >= 75
        ? EnrollmentStatus.Passing
        : EnrollmentStatus.Probation;
}
