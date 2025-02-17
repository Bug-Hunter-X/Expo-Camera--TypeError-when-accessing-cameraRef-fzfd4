# Expo Camera: TypeError when accessing cameraRef

This repository demonstrates a common error when using the Expo Camera API: attempting to access the `cameraRef` before it's fully mounted.  The solution involves ensuring the `cameraRef` is properly initialized before use, typically within a useEffect hook with a dependency on the component's mount state. 

## Bug
The original code attempts to access the `cameraRef` immediately upon component mount, which may result in a `TypeError` if the camera isn't ready yet. 

## Solution
The solution uses the `useEffect` hook and checks for a valid `cameraRef` before proceeding with camera operations.