import { OPENAI_API_KEY } from '$env/static/private';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage } from '@langchain/core/messages';

const model = new ChatOpenAI({
	model: 'gpt-4.1-mini',
	temperature: 1,
	maxTokens: 100,
	apiKey: OPENAI_API_KEY
});
const parser = new StringOutputParser();
