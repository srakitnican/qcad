/**
 * Copyright (c) 2011-2017 by Andrew Mustun. All rights reserved.
 * 
 * This file is part of the QCAD project.
 *
 * QCAD is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * QCAD is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with QCAD.
 */

include("../IsometricProjection.js");


function IsoProject(guiAction) {
    Projection.call(this, guiAction);

    this.projection = RS.Top;
    this.method = RS.Isometric;

    this.setUiOptions("IsoProject.ui");
}

IsoProject.prototype = new Projection();

IsoProject.includeBasePath = includeBasePath;

IsoProject.prototype.initUiOptions = function(resume, optionsToolBar) {
    Projection.prototype.initUiOptions.call(this, resume, optionsToolBar);

    this.method = RSettings.getIntValue("IsoProject/Method", RS.Isometric);

    //var optionsToolBar = EAction.getOptionsToolBar();
    var methodCombo = optionsToolBar.findChild("Method");
    if (isNull(methodCombo)) {
        return;
    }

    methodCombo.blockSignals(true);
    methodCombo.clear();

    methodCombo.addItem(qsTr("Isometric"), RS.Isometric);
    methodCombo.addItem(qsTr("Isometric True Scale"), RS.IsometricTrue);
    methodCombo.addItem(qsTr("Planometric"), RS.Planometric);
    methodCombo.addItem(qsTr("Cabinet"), RS.Cabinet);
    methodCombo.addItem(qsTr("Cavalier"), RS.Cavalier);
    var n = "%1 (%2/%3)"
        .arg(RSettings.getStringValue("IsoProject/User1Name", "User 1"))
        .arg();
    methodCombo.addItem(n, RS.User1);
    methodCombo.addItem(RSettings.getStringValue("IsoProject/User2Name", "User 2"), RS.User2);
    methodCombo.addItem(RSettings.getStringValue("IsoProject/User3Name", "User 3"), RS.User3);
    methodCombo.addItem(RSettings.getStringValue("IsoProject/User4Name", "User 4"), RS.User4);

    methodCombo.blockSignals(false);

    methodCombo.currentIndex = methodCombo.findData(this.method);
};

/**
 * Isometric projection of a single coordinate.
 */
IsoProject.prototype.project = function(p) {
    p.isoProject(this.projection|this.method);
};

IsoProject.prototype.slotMethodChanged = function(v) {
    var optionsToolBar = EAction.getOptionsToolBar();
    var methodCombo = optionsToolBar.findChild("Method");
    this.method = methodCombo.itemData(methodCombo.currentIndex);

    //qDebug("method: 0x" + this.method.toString(16));
    //qDebug("proj: 0x" + (this.projection|this.method).toString(16));

    this.clearCache();
    this.updatePreview(true);
};

IsoProject.prototype.slotTopChanged = function() {
    this.projection = RS.Top;
    this.clearCache();
    this.updatePreview(true);
};

IsoProject.prototype.slotBottomChanged = function() {
    this.projection = RS.Bottom;
    this.clearCache();
    this.updatePreview(true);
};

IsoProject.prototype.slotLeftChanged = function() {
    this.projection = RS.Left;
    this.clearCache();
    this.updatePreview(true);
};

IsoProject.prototype.slotLeftBackChanged = function() {
    this.projection = RS.LeftBack;
    this.clearCache();
    this.updatePreview(true);
};

IsoProject.prototype.slotRightChanged = function() {
    this.projection = RS.Right;
    this.clearCache();
    this.updatePreview(true);
};

IsoProject.prototype.slotRightBackChanged = function() {
    this.projection = RS.RightBack;
    this.clearCache();
    this.updatePreview(true);
};

//IsoProject.prototype.slotTrueScaleChanged = function(v) {
//    this.trueScale = v;
//    this.clearCache();
//    this.updatePreview(true);
//};
