class Event {
    constructor() {
        this.message = "";
        this.eventTyp = "";
        this.eventDate = "";
        this.eventTime = "";
        this.workplace = "";
        this.department = "";
        this.causingDepartment ="";
        this.attributes = [];
    }
    
    addAttribute (attributeName, value) {
        this.attributes.push({"name": attributeName, "value": value});
    }
}


export default Event;