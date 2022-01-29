import { promisify } from 'util'

type formatContactTp = (contact: string, onSuccess: Function, onError: Function) => void

const formatContact: formatContactTp = (contact, onSuccess, onError) => {
    const formattedContact = contact.toString().toUpperCase()

    if (!formattedContact) {
        onError('could not format contact')

    } else {
        onSuccess(formattedContact)
    }
}

formatContact[promisify.custom] = (contact: string) => {
    return new Promise((resolve, reject) => {
        formatContact(
            contact, 
            (onSuccess: Function) => resolve(onSuccess),
            (onError: Function) => reject(onError)
        )
    })
}

const format = promisify(formatContact)

const formattedContact = function(contact: string) { 
    // contact.toString().toUpperCase() 
    throw new Error('could not format contact')
}

format('', formattedContact)
    .then(result => console.log(result)) // output:  SUYA
    .catch(err => console.log(err))

export {
    format,
    formattedContact
}