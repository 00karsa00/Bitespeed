import excuteQuery from "../mysql.js";

export const identifyInfo = async (req, res, next) => {
    try {
        let { email, phone } = req.body;
        if(!email || !phone) {
            return res.json({
                error: true,
                message: "Email or Phone was missing"
            })
        }
        let contactInfoAll = [];
        contactInfoAll = await excuteQuery('select * from contact where email = ? or phoneNumber = ? order by id asc',[email, phone])
        if(!contactInfoAll.length) {
            await excuteQuery('insert into contact (phoneNumber,email,linkedId,linkPrecedence,createdAt,updatedAt) values (?,?,?,?,?,?)',[phone,email,null,"primary",new Date(), new Date()]);
        }
        if(contactInfoAll.length) {
            let isMatch = false;
            contactInfoAll.map(item => {
                if(item.email == email && item.phoneNumber == phone) {
                    isMatch = true;
                }
            })
            if(!isMatch) {
               await excuteQuery('insert into contact (phoneNumber,email,linkedId,linkPrecedence,createdAt,updatedAt) values (?,?,?,?,?,?)',[phone,email,contactInfoAll[0].id,"secondary",new Date(), new Date()]);
            }
        }   
        contactInfoAll = await excuteQuery('select * from contact where email = ? or phoneNumber = ? order by id asc',[email, phone]);
        let contact = {
            primaryContatctId: null,
            emails: [],
            phoneNumbers: [],
            secondaryContactIds: []
        } 
        contactInfoAll.map(item => {
            if(!contact.primaryContatctId) contact.primaryContatctId = item.id;
            contact.emails.push(item.email);
            contact.phoneNumbers.push(item.phoneNumber);
            if(contact.primaryContatctId != item.id) contact.secondaryContactIds.push(item.id);
        })
        contact.emails = [...new Set( contact.emails)]
        contact.phoneNumbers = [...new Set( contact.phoneNumbers)]
        res.status(200).json({
            contact
        })
    } catch (error) {
        console.log("Error => ", error)
        console.trace();
        next({ message: "Internal Error" })
    }
};