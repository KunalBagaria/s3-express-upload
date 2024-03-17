# S3-Express-Upload

A simple password gated Express API to manage an AWS S3 bucket.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/kunalbagaria/s3-express-upload.git
```

2. Install dependencies:

```bash
cd s3-express-upload
bun install
```

3. Edit `.env.sample` file to `.env` and fill in the required environment variables:

```bash
# S3 Bucket and Region
AWS_REGION="your-region"
AWS_BUCKET="your-bucket-name"
AWS_ACCESS_KEY_ID="your-access-key-id"
AWS_SECRET_ACCESS_KEY="your-secret-access-key"

# Cloudfront
CLOUDFRONT_DOMAIN="your-cloudfront-domain"

# Authentication
PASSWORD="your-secure-password"

# Miscellaneous
SERVER_URL="http://localhost:8080/"
```

4. Start the server:

```bash
bun dev
```

The API will be accessible at `http://localhost:8080`.

## Usage

### Authentication

All routes except the root (`/`) require authentication. Include the `Authorization` header with the value `<password>` in your requests.

### API Endpoints

- `GET /`: Returns a welcome message.
- `GET /files/:startDate?/:endDate?`: Retrieve a list of all files in your storage.
- `POST /upload-file`: Upload a new file to your storage. Include the file data in the request body as `multipart/form-data`.

## Contributing

Contributions are welcome! Please follow the standard GitHub workflow:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Commit your changes
4. Open a pull request against the `main` branch

## License

This project is licensed under the [MIT License](LICENSE).
