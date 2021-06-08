export class User {
    firstname:string;
    lastname:string;
    emailid:string;
    role:string;


    constructor(f:string,l:string,e:string,r:string)
    {
        this.firstname = f;
        this.lastname = l;
        this.emailid = e;
        this.role = r;
    }

    public  isAdmin():boolean
    {
        if(this.role == "ADMINISTRATOR")
        {
            return true;
        }

        return false;
    }

    public  isOperator():boolean
    {
        if(this.role == "OPERATOR")
        {
            return true;
        }

        return false;
    }

    public  isVolunteer():boolean
    {
        if(this.role == "VOLUNTEER")
        {
            return true;
        }

        return false;
    }

    public  isPOC():boolean
    {
        if(this.role == "POC")
        {
            return true;
        }

        return false;
    }


}