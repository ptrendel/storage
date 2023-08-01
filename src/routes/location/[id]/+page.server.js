import   prisma  from '$lib/server/db.js'

export async function load({params}){
    console.log (params);
    const location = await prisma.location.findUnique({
        where: {
            id : Number(params.id)
        }
    })
    return {
        location
    }
}


export const actions = {
    addStorage: async ({request}) => {
        const data = await request.formData();
        const name = data.get('name')
        const description = data.get('description')
        const locationId = data.get('locationId')
        const type = data.get('type')
        const volume = Number(data.get('volume'))


        const newStorage = await prisma.storage.create ({
            data : {
                name,
                description,
                volume,
                type,
                location: {
                    connect: {
                        id: Number(locationId)
                    }
                }
            }
            
        })

        return {
            message : 'ok'
        }
    }    
};