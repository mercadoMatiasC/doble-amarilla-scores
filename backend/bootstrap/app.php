<?php

use App\Exceptions\BusinessException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        //web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (BusinessException $e, $request) { //DOMAIN EXCEPTIONS
            if ($request->is('api/*')) 
                return response()->json(['success' => false, 'message' => $e->getMessage()], 409);
        });

        $exceptions->render(function (\Illuminate\Database\Eloquent\ModelNotFoundException $e, $request) { //RESOURCE NOT FOUND
            if ($request->is('api/*')) 
                return response()->json(['success' => false, 'message' => 'Resource not found.'], 404);
        });
        
        $exceptions->render(function (\Symfony\Component\HttpKernel\Exception\NotFoundHttpException $e, $request) { //ROUTE NOT FOUND
            if ($request->is('api/*')) 
                return response()->json(['success' => false, 'message' => 'Resource not found.'], 404);
        });

        $exceptions->render(function (Throwable $e, $request) { //UNEXPECTED SERVER ERRORS
            if ($request->is('api/*')) {
                $msg = config('app.debug') ? $e->getMessage() : 'Internal server error.';
                return response()->json(['success' => false, 'message' => $msg], 500);
            }
        });
    })->create();
