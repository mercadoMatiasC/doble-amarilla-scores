<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\Encoders\PngEncoder;

class ImageService {
    public static function squareAndResize(UploadedFile $file, string $directory, string $filename = 'image.png', int $size = 136, ?string $deletePath = null, bool $toDelete = false): string {
        if ($toDelete && $deletePath && Storage::disk('public')->exists($deletePath))
            Storage::disk('public')->delete($deletePath);

        $manager = new ImageManager(new Driver());
        $image = $manager->read($file);
        $image->cover($size, $size);
        
        $encoded = $image->encode(new PngEncoder());

        $path = "{$directory}/{$filename}";
        Storage::disk('public')->put($path, (string) $encoded);

        return $path;
    }
}