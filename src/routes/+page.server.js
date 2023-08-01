import { fail } from '@sveltejs/kit';
import prisma from '$lib/server/db.js'

export async function  load(){
    const locations = await prisma.location.findMany({
        include : {
            storages : true
        }
    });
    return {
        locations 
    }
}

export const actions = {
    new: async ({request}) => {
        return {
            name : '',
            description : ''
        }
    },
    create : async ({request}) => {
        const data = await request.formData();
        const name= data.get('name')
        const description= data.get('description')

        if(!name || name==='') {
            return fail (401,{name,description,message:'No empty name'})
        }
        if(!description || description==='') {
            return fail (401,{name,description,message:'No empty description'})
        }
       await prisma.location.create({
            data : {
                name,
                description
            }
        })
        return {message: 'OK'}
    },
    edit: async ({request}) => {
        const data = await request.formData();
        const location = await prisma.location.findUnique({
            where : { id : Number(data.get('id')) }
        })
        return {
            id : location?.id, 
            name : location?.name,
            description : location?.description, action: 'edit'
        }
    } ,
    update: async ({request}) => {
        const data = await request.formData();
        const id = data.get('id');
        const name = data.get('name');
        const description = data.get('description');

        if(!name) {
            return fail(500,{name,description,message : 'Not a valid name'})
        }
        if(!description) {
            return fail(500,{name,description,message : 'Not a valid description'})
        }
        const updatedLocation = await prisma.location.update({
            where : {
                id : Number(id)
            },
            data : {
                name ,
                description
            }
        })
    },
    confirmDelete : async ({request}) => {
        const data = await request.formData();
        const location = await prisma.location.findUnique({
            where : { id : Number(data.get('id')) }
        })
        return {
            id : location?.id, 
            name : location?.name,
            description : location?.description, action: 'confirmDelete'
        }
    },
    delete: async ({request}) => {
        const data = request.formData();
        const id = (await data).get('id')
        await prisma.location.delete({
            where: {
                id : Number(id)
            }
        })
        return {message: 'OK'}
    }
}