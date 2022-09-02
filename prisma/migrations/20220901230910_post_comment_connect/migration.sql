-- CreateTable
CREATE TABLE "_CatagoryToPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CatagoryToPost_AB_unique" ON "_CatagoryToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_CatagoryToPost_B_index" ON "_CatagoryToPost"("B");

-- AddForeignKey
ALTER TABLE "_CatagoryToPost" ADD CONSTRAINT "_CatagoryToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Catagory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CatagoryToPost" ADD CONSTRAINT "_CatagoryToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
