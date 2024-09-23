import fastify from 'fastify';
import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider
} from 'fastify-type-provider-zod';
import { createGoalRoute } from './routes/create-goal';
import { createCompletionRoute } from './routes/create-completion';
import { getPendingGoalsRoute } from './routes/get-pending-goals';
import { getWeekSummaryRoute } from './routes/get-week-summary';
import fastifyCors from '@fastify/cors';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
    origin: '*',
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Usando o plugin routes/create-goal.ts que criamos.
app.register(createGoalRoute);
app.register(createCompletionRoute);
app.register(getPendingGoalsRoute);
app.register(getWeekSummaryRoute);

app.listen({
    port: 3000,
}).then(() => {
    console.log('HTTP server running!');
});

// app.get('/pending-goals', async () => {
//     const { pendingGoals } = await getWeeklyPendingGoals()

//     return { pendingGoals }
// })

// app.post('/completions', {
//     schema: {
//         body: z.object({
//             goalId: z.string(),
//         }),
//     },
// }, async (request) => {

//     const { goalId } = request.body;

//     const result = await createGoalCompletion({
//         goalId,
//     });

//     return result;
// });

// app.post('/goals', {
//     schema: {
//         body: z.object({
//             title: z.string(),
//             desiredWeeklyFrequency: z.number().int().min(1).max(7),
//         }),
//     },
// }, async (request) => {

//     const { title, desiredWeeklyFrequency } = request.body;

//     await createGoal({
//         title,
//         desiredWeeklyFrequency
//     });
// });

