cd ../
mkdir output
# node_modules를 제외한 모든 파일 복사
cp -R ./code-it-2/* ./output/       # 일반 파일들
cp -R ./code-it-2/.[!.]* ./output/  # 숨김 파일들 (.storybook, .gitignore 등)
rm -rf ./output/node_modules        # node_modules 제거
cp -R ./output ./code-it-2/
