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

#ifndef RSNAPFREE_H
#define RSNAPFREE_H

#include "snap_global.h"

#include "RSnap.h"

class RGraphicsView;
class RMouseEvent;

/**
 * \brief Free snapper implementation.
 *
 * \scriptable
 *
 * \ingroup snap
 */
class QCADSNAP_EXPORT RSnapFree : public RSnap {
public:
    RSnapFree() : RSnap(RSnap::Free) {}
    virtual ~RSnapFree() {}

    virtual RVector snap(
            const RVector& position,
            RGraphicsView& view,
            double range=RNANDOUBLE
    );
};

Q_DECLARE_METATYPE(RSnapFree*)

#endif
