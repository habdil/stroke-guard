// import { NextResponse } from 'next/server';
// import { spawn } from 'child_process';
// import path from 'path';

// function getErrorMessage(error: unknown): string {
//   if (error instanceof Error) return error.message;
//   return String(error);
// }

// export async function POST(req: Request) {
//   try {
//     const data = await req.json();
//     console.log('Received request data:', data);
    
//     const jsonString = JSON.stringify(data);
//     const scriptPath = path.join(process.cwd(), 'scripts', 'predict.py');
    
//     const pythonProcess = spawn('python', [scriptPath, jsonString]);

//     return new Promise((resolve, reject) => {
//       let resultChunks: string[] = [];
//       let errorChunks: string[] = [];

//       pythonProcess.stdout.on('data', (data) => {
//         const output = data.toString();
//         resultChunks.push(output);
//       });

//       pythonProcess.stderr.on('data', (data) => {
//         const output = data.toString();
//         console.log('Python log:', output.trim());
//         errorChunks.push(output);
//       });

//       pythonProcess.on('close', (code) => {
//         console.log('Python process exited with code:', code);
        
//         if (code !== 0) {
//           const errorMessage = errorChunks.join('');
//           reject(new Error(`Python process error: ${errorMessage}`));
//           return;
//         }

//         try {
//           const result = resultChunks.join('').trim();
          
//           if (!result) {
//             throw new Error('Empty result from Python script');
//           }

//           // Find the last valid JSON in the output
//           const jsonMatch = result.match(/\{[^{]*\}/g);
//           if (!jsonMatch) {
//             throw new Error('No valid JSON found in Python output');
//           }

//           const lastJson = jsonMatch[jsonMatch.length - 1];
//           const prediction = JSON.parse(lastJson);
          
//           resolve(NextResponse.json(prediction));
//         } catch (error: unknown) {
//           console.error('Parse error:', error);
//           console.error('Raw result:', resultChunks.join(''));
//           reject(new Error(`Failed to parse prediction result: ${getErrorMessage(error)}`));
//         }
//       });

//       setTimeout(() => {
//         pythonProcess.kill();
//         reject(new Error('Python process timed out'));
//       }, 30000);
//     });

//   } catch (error: unknown) {
//     console.error('API error:', error);
//     return NextResponse.json(
//       { 
//         error: 'Failed to process prediction', 
//         details: getErrorMessage(error)
//       },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

// Helper function untuk error message
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

// Define tipe untuk prediction result
interface PredictionResult {
  prediction: number;
  probability: number;
  risk_factors: string[];
  confidence: string;
  threshold: number;
}

export async function POST(req: Request): Promise<Response> {
  try {
    const data = await req.json();
    console.log('Received request data:', data);
    
    const jsonString = JSON.stringify(data);
    const scriptPath = path.join(process.cwd(), 'scripts', 'predict.py');
    
    const pythonProcess = spawn('python', [scriptPath, jsonString]);

    const result = await new Promise<PredictionResult>((resolve, reject) => {
      let resultChunks: string[] = [];
      let errorChunks: string[] = [];

      pythonProcess.stdout.on('data', (data) => {
        const output = data.toString();
        resultChunks.push(output);
      });

      pythonProcess.stderr.on('data', (data) => {
        const output = data.toString();
        console.log('Python log:', output.trim());
        errorChunks.push(output);
      });

      pythonProcess.on('close', (code) => {
        console.log('Python process exited with code:', code);
        
        if (code !== 0) {
          const errorMessage = errorChunks.join('');
          reject(new Error(`Python process error: ${errorMessage}`));
          return;
        }

        try {
          const result = resultChunks.join('').trim();
          
          if (!result) {
            throw new Error('Empty result from Python script');
          }

          // Find the last valid JSON in the output
          const jsonMatch = result.match(/\{[^{]*\}/g);
          if (!jsonMatch) {
            throw new Error('No valid JSON found in Python output');
          }

          const lastJson = jsonMatch[jsonMatch.length - 1];
          const prediction = JSON.parse(lastJson) as PredictionResult;
          resolve(prediction);
        } catch (error) {
          console.error('Parse error:', error);
          console.error('Raw result:', resultChunks.join(''));
          reject(new Error(`Failed to parse prediction result: ${getErrorMessage(error)}`));
        }
      });

      // Add timeout
      setTimeout(() => {
        pythonProcess.kill();
        reject(new Error('Python process timed out'));
      }, 30000);
    });

    return NextResponse.json(result);

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process prediction', 
        details: getErrorMessage(error) 
      },
      { status: 500 }
    );
  }
}