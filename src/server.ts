import { Prisma, PrismaClient } from "@prisma/client";
import fastify from "fastify";
import { appendFile } from "fs";
import { request } from "http";
import { stringify } from "querystring";
import {number, z} from 'zod'



const prisma = new PrismaClient()
const app = fastify()

app.get('/users', async ()=>{
 const users =  await prisma.user.findMany
 return {users}
})

app.post('/users', async (request, replay)=>{
   const createUserSchema = await z.object({
    name:  z.string(),
    email: z.string().email(),
   })

   const {name, email} = createUserSchema.parse(request.body)

    // await prisma.user.create({
    //   data: {
    //     name, 
    //     email,
    //   }
    // })

    return replay.status(201).send
})



app.put('/user', ()=>{

})

app.delete('/user', ()=>{

})

app.listen({
    host: '0.0.0.0',
    port: process.env.PORT? Number(process.env.PORT) : 3333,
}).then(()=>{
    console.log('SERVER RUNING IN PORT');
    
})


