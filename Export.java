package export;

import columbus.CsiHeader;
import columbus.StrTable;
import columbus.java.asg.Factory;
import columbus.java.asg.algorithms.AlgorithmPreorder;
import columbus.java.asg.struc.Member;
import columbus.java.asg.struc.Package;
import columbus.java.asg.struc.Scope;
import columbus.java.asg.struc.TypeDeclaration;
import columbus.java.asg.visitors.VisitorAbstractNodes;

import java.io.FileWriter;

class MyVisitor extends VisitorAbstractNodes {
    private int depth = 0;
    private final StringBuilder nodeStringBuilder = new StringBuilder();
    private final StringBuilder edgeStringBuilder = new StringBuilder();

    @Override
    public void visitScope_HasMembers(Scope begin, Member end) { this.depth++; }

    @Override
    public void visitEndScope_HasMembers(Scope begin, Member end) { this.depth--; }

    //Ha a node típusa TypeDeclaration
    @Override
    public void visit(TypeDeclaration node, boolean callVirtualBase) {
        super.visit(node, callVirtualBase);

        //gyökér elemnek nincs parent-je
        int parentId;
        try {
            parentId = node.getParent().getId();
        } catch (NullPointerException e) {
            parentId = -1;
        }
        appendNodeToStringBuilder(node.getName(), node.getId(), parentId, node.getClass().toString());
    }

    //Ha a node típusa Package
    @Override
    public void visit(Package node, boolean callVirtualBase) {
        super.visit(node, callVirtualBase);

        //gyökér elemnek nincs parent-je
        int parentId;
        try {
            parentId = node.getParent().getId();
        } catch (NullPointerException e) {
            parentId = -1;
        }
        appendNodeToStringBuilder(node.getName(), node.getId(), parentId, node.getClass().toString());
    }

    //Előkészíti a Stringet fájlbaíráshoz
    private void appendNodeToStringBuilder(String name, int id, int parentId, String className) {
        if (!name.isEmpty()) {
            /*
            for (int i = 0; i < this.depth; i++) {
                System.out.print("-");
                nodeStringBuilder.append("-");
            }
            System.out.println(name + ":" + id + ":" + this.depth + ":" + parentId);
            */
            nodeStringBuilder
                    .append("{")
                        .append("\"id\" : ").append(id).append(",")
                        .append("\"label\" : \"").append(name).append("\",")
                        .append("\"group\" : \"").append(className).append("\"")
                    .append("},\n");

            edgeStringBuilder
                    .append("{")
                        .append("\"from\" : ").append(parentId).append(",")
                        .append("\"to\" :").append(id)
                    .append("},\n");
        }
    }

    //Fájlbaírás
    public void writeToFile(String fileName) {
        try {
            //JSON létrehozása
            FileWriter fileWriter= new FileWriter(fileName);
            fileWriter.write("{\n");
            fileWriter.write("\"nodes\":[\n");
                //vessző törlése az utolsó obj-ről -> ",\n"
                nodeStringBuilder.deleteCharAt(nodeStringBuilder.length() - 2);
                fileWriter.write(nodeStringBuilder.toString());
            fileWriter.write("],\n");
            fileWriter.write("\"edges\":[\n");
                //vessző törlése az utolsó obj-ről -> ",\n"
                edgeStringBuilder.deleteCharAt(edgeStringBuilder.length() - 2);
                fileWriter.write(edgeStringBuilder.toString());
            fileWriter.write("]\n");
            fileWriter.write("}");
            fileWriter.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

public class Export {

    /*
    Ctrl+Alt+Shift+L -> kódrendezés
    fordítás cmd-vel: javac export/Export.java -cp JAN.jar
    futtatás cmd-vel: java -cp JAN.jar;.;export/Export.class;export/MyVisitor.class export/Export
    */
    public static void main(String[] args) {

        StrTable strTable = new StrTable();
        CsiHeader csiHeader = new CsiHeader();

        Factory factory = new Factory(strTable);
        factory.load("log4j-1.2.17.ljsi", csiHeader);

        MyVisitor myVisitor = new MyVisitor();

        AlgorithmPreorder algorithmPreorder = new AlgorithmPreorder();
        algorithmPreorder.run(factory, myVisitor);


        myVisitor.writeToFile("output.json");
        System.out.println("End of writting!");
    }
}