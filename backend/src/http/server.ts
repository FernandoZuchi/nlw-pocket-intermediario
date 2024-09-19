import fastify from 'fastify'
import { createGoal } from '../functions/create-goal'
import z from 'zod'
import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider
} from 'fastify-type-provider-zod';
import { getWeeklyPendingGoals } from '../functions/get-week-pending-goals';
import { createGoalCompletion } from '../functions/create-goal-completion';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.get('/pending-goals', async () => {
    const { pendingGoals } = await getWeeklyPendingGoals()

    return { pendingGoals }
})

app.post('/completions', {
    schema: {
        body: z.object({
            goalId: z.string(),
        }),
    },
}, async (request) => {

    const { goalId } = request.body;

    const result = await createGoalCompletion({
        goalId,
    });

    return result;
});

app.post('/goals', {
    schema: {
        body: z.object({
            title: z.string(),
            desiredWeeklyFrequency: z.number().int().min(1).max(7),
        }),
    },
}, async (request) => {

    const { title, desiredWeeklyFrequency } = request.body;

    await createGoal({
        title,
        desiredWeeklyFrequency
    });
});

app.listen({
    port: 3000,
}).then(() => {
    console.log('HTTP server running!');
});