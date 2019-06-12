export const Type = Object.freeze({
    LETTER: "Letter",
    PACKAGE: "Package"
});

export const Status = Object.freeze({
    ORIGIN: "Received and processed in the parcel center of origin",
    DESTINATION: "Received and processed in the destination parcel center",
    DELIVERED: "Delivered"
});

export const Weights = Object.freeze({
    LIGHT: "Less than 1kg",
    MEDIUM: "Between 1kg and 5kg",
    HEAVY: "More than 5kg"
});