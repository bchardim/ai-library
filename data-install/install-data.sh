
git clone https://gitlab.com/opendatahub/sample-models.git
rm -rf ./sample-models/.git
s3cmd put --recursive sample-models s3://${S3_BUCKET}/${S3_PREFIX}  --host=${S3_ENDPOINT_URL} --access_key=${S3_ACCESS_KEY} --secret_key=${S3_SECRET_KEY} --region=${S3_REGION}
