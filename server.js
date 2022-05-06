const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// Require para usar Prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.get('/', (req, res) => {
  res.json({message: 'alive'});
});

app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});

app.get('/explorers', async (req, res) => {
  const allExplorers =  await prisma.explorer.findMany({});
  res.json(allExplorers);
});

app.get('/explorers/:id', async (req, res) => {
  const id = req.params.id;
  const explorer = await prisma.explorer.findUnique({where: {id: parseInt(id)}});
  res.json(explorer);
});

app.post('/explorers', async (req, res) => {
  const explorer = {
    name: req.body.name,
    username: req.body.username,
    mission: req.body.mission
   };
  const message = 'Explorer creado.';
  await prisma.explorer.create({data: explorer});
  return res.json({message});
});

app.put('/explorers/:id', async (req, res) => {
	const id = parseInt(req.params.id);

	await prisma.explorer.update({
		where: {
			id: id
		},
		data: {
			mission: req.body.mission
		}
	})

	return res.json({message: "Actualizado correctamente"});
});

app.delete('/explorers/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	await prisma.explorer.delete({where: {id: id}});
	return res.json({message: "Eliminado correctamente"});
});

app.get('/missioncommanders', async (req, res) => {
  const allMissionCommanders =  await prisma.MissionCommander.findMany({});
  res.json(allMissionCommanders);
});

app.get('/missioncommanders/:id', async (req, res) =>{
  const id = req.params.id;
  const missionCommander = await prisma.MissionCommander.findUnique({where: {id: parseInt(id)}});
  res.json(missionCommander)
})

app.post('/MissionCommanders', async (req, res) => {
  const missionCommander = {
    name: req.body.name,
    lang: req.body.lang,
    mission: req.body.mission,
    enrollments: req.body.enrollments
  };
  const message = "Mission Commander Creado";
  await prisma.MissionCommander.create({data: missionCommander});
  return res.json({message});
})

app.put('/MissionCommanders/:id', async (req, res) =>{
  const id = parseInt(req.params.id);
  await prisma.MissionCommander.update({
    where: {
      id: id
    },
    data: { 
      lang: req.body.lang,
      mission: req.body.mission,
      enrollments: req.body.enrollments
    } 
  })
  return res.json({message: "Actualziado correctamente"});
})